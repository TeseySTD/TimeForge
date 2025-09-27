import './Timers.scss'
import TimerMenu from "@/components/timers/TimerMenu/TimerMenu"
import TimersSet from '@/types/timersSet';
import Timer from '@/types/timer';
import { useContext, useEffect, useState } from 'react';
import IconButton from '@/components/ui/IconButton/IconButton';
import AddTimerSetModal from '@/components/timers/AddTimersSetModal/AddTimersSetModal';
import EditTimersSetModal from '@/components/timers/EditTimersSetModal/EditTimersSetModal';
import DeleteTimersSetModal from '@/components/timers/DeleteTimersSetModal/DeleteTimersSetModal';
import { deleteTimersSet, getAllTimersSets, saveTimersSet } from '@/utils/storageUtils';
import useToast from '@/hooks/useToast';
import useSound from '@/hooks/useSound';
import lofiAlert from '@/assets/sounds/lofi-alert.wav';
import { showNotification } from '@/utils/notificationUtils';
import { useNavigate, useParams } from 'react-router';
import TimersList from '@/components/timers/TimersList/TimersList';
import { TimersContext } from '@/contexts/TimersContext';

const Timers: React.FC = () => {
    const { loadTimersSets, activeTimers: activeTimersRegistry, setActiveTimers } = useContext(TimersContext);
    const [timersSets, setTimersSets] = useState<TimersSet[]>([]);
    const { timersSetId: selectedTimersSetId, timerId: selectedTimerId } = useParams();
    const [selectedTimersSet, setSelectedTimersSet] = useState<TimersSet | undefined>(undefined);
    const [selectedTimer, setSelectedTimer] = useState<Timer | undefined>(undefined);
    const [isSelectedTimerActive, setIsSelectedTimerActive] = useState(false);
    const [isModalOpened, setIsModalOpened] = useState(false);
    const [modalState, setModalState] = useState<'add' | 'edit' | 'delete'>('add');
    const [toast] = useToast();
    const { play: playTimeoutSound, stop: stopTimeoutSound, isPlaying } = useSound(lofiAlert);
    const navigate = useNavigate();

    const setTimersSetAndFirstTimerWithRoute = (set: TimersSet | undefined) => {
        setSelectedTimersSet(set);
        setSelectedTimer(set?.timers[0] ?? undefined);
        if (set)
            navigate(`/timers/${set.id}`, { replace: true });
    }

    const setTimerAndItsSetWithRoute = (timer: Timer | undefined) => {
        setSelectedTimer(timer);
        if (timer && selectedTimersSet && selectedTimersSet.timers.some(t => t.id === timer.id))
            navigate(`/timers/${selectedTimersSet.id}/${timer.id}`, { replace: true });
    }

    const startTimerCallback = () => {
        if (!selectedTimer || !selectedTimersSet)
            return;
        if (!isSelectedTimerActive)
            selectedTimer.startTimer();
        else {
            selectedTimer.pauseTimer();
            saveTimersSet(selectedTimersSet);
        }
        stopTimeoutSound();
        setIsSelectedTimerActive(!isSelectedTimerActive);
    }

    const resetTimerCallback = () => {
        if (!selectedTimer || !selectedTimersSet)
            return;
        selectedTimer.resetTimer();
        stopTimeoutSound();
        saveTimersSet(selectedTimersSet);
    }

    const finishTimerCallback = (timer: Timer, set: TimersSet) => {
        toast({
            titleText: 'Timer finished',
            children: timer.name,
            type: 'success',
            autoClose: 6000,
            onClose: () => stopTimeoutSound()
        });
        showNotification(
            `Time Forge`,
            {
                body: `Timer ${timer.name} from timer set ${set.name} finished.`,
                icon: '/TimeForge/favicon.svg',
                silent: false
            }
        );

        if (!isPlaying()) { //Other timer not played
            navigate(
                `/timers/${set.id}/${timer.id}`,
                { replace: true }
            );
            playTimeoutSound();
            setSelectedTimersSet(set);
            setSelectedTimer(timer);
        }
    }

    const handleRoutChange = (timersSets: TimersSet[]) => {
        let selectedSet: TimersSet | undefined;
        let selectedTimer: Timer | undefined;

        if (!selectedTimersSetId)
            selectedSet = timersSets[0];
        else
            selectedSet = timersSets.find(set => set.id === +selectedTimersSetId);
        if (!selectedSet) {
            navigate('/404', { replace: true });
            return;
        }

        if (!selectedTimerId)
            selectedTimer = selectedSet.timers[0];
        else
            selectedTimer = selectedSet.timers.find(timer => timer.id === +selectedTimerId);
        if (!selectedTimer) {
            navigate('/404', { replace: true });
            return;
        }

        setSelectedTimersSet(selectedSet);
        setSelectedTimer(selectedTimer);
    }

    const addSetCallback = (t: TimersSet) => {
        console.debug('add timers set: ', t);
        timersSets.push(t);
        saveTimersSet(t)
        setTimersSets([...timersSets]);
        if (!selectedTimersSet)
            setTimersSetAndFirstTimerWithRoute(t);
    }

    const editSetCallback = (t: TimersSet) => {
        console.debug('edit timers set: ', t);
        const newTimersSets = timersSets.map(ts => ts.id === t.id ? t : ts);
        saveTimersSet(t);
        setTimersSetAndFirstTimerWithRoute(t);
        setTimersSets([...newTimersSets]);
    }

    const deleteSetCallback = (t: TimersSet) => {
        console.debug('delete timers set: ', t);
        const newTimersSets = timersSets.filter(ts => ts.id !== t.id);
        deleteTimersSet(t.id);
        setTimersSetAndFirstTimerWithRoute(newTimersSets.length > 0 ? newTimersSets[0] : undefined);
        setTimersSets([...newTimersSets]);
    }


    useEffect(() => {
        let storageData = loadTimersSets();
        const processedData = storageData.map(set => {
            const processedTimers = set.timers.map(timer => {
                const activeTimer = activeTimersRegistry.get(timer.id);
                if (activeTimer) {
                    return activeTimer;
                } else {
                    return timer;
                }
            });

            return new TimersSet(set.name, processedTimers, set.id);
        });

        setTimersSets(processedData);
        if (!selectedTimersSetId) { //Check if any route params are set
            setSelectedTimersSet(processedData.length > 0 ? processedData[0] : undefined);
            setSelectedTimer(processedData[0]?.timers[0] ?? undefined);
        }
        else
            handleRoutChange(processedData);
    }, [])

    useEffect(() => {
        timersSets.forEach(set =>
            set.timers.forEach(timer => {
                activeTimersRegistry.set(timer.id, timer);
                timer.onFinish = () => finishTimerCallback(timer, set);
            }));

        setActiveTimers(activeTimersRegistry);
    }, [timersSets])

    useEffect(() => {
        if (!selectedTimer) return;
        setIsSelectedTimerActive(selectedTimer.isActive);
        selectedTimer.onStateChange = (state: boolean) => {
            setIsSelectedTimerActive(state);
        }
    }, [selectedTimer])

    useEffect(() => {
        if (!selectedTimersSet) return;
        if (isModalOpened) {
            selectedTimersSet.timers.forEach(timer => timer.pauseTimer())
            setSelectedTimersSet(selectedTimersSet);
            saveTimersSet(selectedTimersSet);
        }
    }, [isModalOpened]);

    return (
        <div id="timers">
            {selectedTimersSet && selectedTimer &&
                <>
                    <TimerMenu timersSets={timersSets} selectedTimersSet={selectedTimersSet} setSelectedCallback={setTimersSetAndFirstTimerWithRoute} />
                    <div id="timers-content">
                        <TimersList
                            timersSet={selectedTimersSet}
                            selectedTimer={selectedTimer}
                            isSelectedTimerActive={isSelectedTimerActive}
                            selectTimerCallback={setTimerAndItsSetWithRoute}
                            startTimerCallback={startTimerCallback}
                            resetTimerCallback={resetTimerCallback}
                        />
                        <div id="timers-toolbar">
                            <IconButton
                                onClick={() => { setIsModalOpened(true); setModalState('add'); }}
                                title="Add timer set" >
                                <svg viewBox='0 0 24 24' fill='currentColor'>
                                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                                </svg>
                            </IconButton>
                            <IconButton
                                onClick={() => { setIsModalOpened(true); setModalState('edit'); }}
                                disabled={!selectedTimersSet}
                                title="Edit timer set" >
                                <svg viewBox='0 0 25 25' fill='currentColor'>
                                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                                </svg>
                            </IconButton>
                            <IconButton
                                onClick={() => { setIsModalOpened(true); setModalState('delete'); }}
                                disabled={!selectedTimersSet}
                                title="Delete timer set" >
                                <svg viewBox='0 0 24 24' fill='currentColor'>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3094 2.25002H13.6908C13.9072 2.24988 14.0957 2.24976 14.2737 2.27819C14.977 2.39049 15.5856 2.82915 15.9146 3.46084C15.9978 3.62073 16.0573 3.79961 16.1256 4.00494L16.2373 4.33984C16.2562 4.39653 16.2616 4.41258 16.2661 4.42522C16.4413 4.90933 16.8953 5.23659 17.4099 5.24964C17.4235 5.24998 17.44 5.25004 17.5001 5.25004H20.5001C20.9143 5.25004 21.2501 5.58582 21.2501 6.00004C21.2501 6.41425 20.9143 6.75004 20.5001 6.75004H3.5C3.08579 6.75004 2.75 6.41425 2.75 6.00004C2.75 5.58582 3.08579 5.25004 3.5 5.25004H6.50008C6.56013 5.25004 6.5767 5.24998 6.59023 5.24964C7.10488 5.23659 7.55891 4.90936 7.73402 4.42524C7.73863 4.41251 7.74392 4.39681 7.76291 4.33984L7.87452 4.00496C7.94281 3.79964 8.00233 3.62073 8.08559 3.46084C8.41453 2.82915 9.02313 2.39049 9.72643 2.27819C9.90445 2.24976 10.093 2.24988 10.3094 2.25002ZM9.00815 5.25004C9.05966 5.14902 9.10531 5.04404 9.14458 4.93548C9.1565 4.90251 9.1682 4.86742 9.18322 4.82234L9.28302 4.52292C9.37419 4.24941 9.39519 4.19363 9.41601 4.15364C9.52566 3.94307 9.72853 3.79686 9.96296 3.75942C10.0075 3.75231 10.067 3.75004 10.3553 3.75004H13.6448C13.9331 3.75004 13.9927 3.75231 14.0372 3.75942C14.2716 3.79686 14.4745 3.94307 14.5842 4.15364C14.605 4.19363 14.626 4.2494 14.7171 4.52292L14.8169 4.82216L14.8556 4.9355C14.8949 5.04405 14.9405 5.14902 14.992 5.25004H9.00815Z" />
                                    <path d="M5.91509 8.45015C5.88754 8.03685 5.53016 7.72415 5.11686 7.7517C4.70357 7.77925 4.39086 8.13663 4.41841 8.54993L4.88186 15.5017C4.96736 16.7844 5.03642 17.8205 5.19839 18.6336C5.36679 19.4789 5.65321 20.185 6.2448 20.7385C6.8364 21.2919 7.55995 21.5308 8.4146 21.6425C9.23662 21.7501 10.275 21.7501 11.5606 21.75H12.4395C13.7251 21.7501 14.7635 21.7501 15.5856 21.6425C16.4402 21.5308 17.1638 21.2919 17.7554 20.7385C18.347 20.185 18.6334 19.4789 18.8018 18.6336C18.9638 17.8206 19.0328 16.7844 19.1183 15.5017L19.5818 8.54993C19.6093 8.13663 19.2966 7.77925 18.8833 7.7517C18.47 7.72415 18.1126 8.03685 18.0851 8.45015L17.6251 15.3493C17.5353 16.6971 17.4713 17.6349 17.3307 18.3406C17.1943 19.025 17.004 19.3873 16.7306 19.6431C16.4572 19.8989 16.083 20.0647 15.391 20.1552C14.6776 20.2485 13.7376 20.25 12.3868 20.25H11.6134C10.2626 20.25 9.32255 20.2485 8.60915 20.1552C7.91715 20.0647 7.54299 19.8989 7.26958 19.6431C6.99617 19.3873 6.80583 19.025 6.66948 18.3406C6.52892 17.6349 6.46489 16.6971 6.37503 15.3493L5.91509 8.45015Z" />
                                    <path d="M9.42546 10.2538C9.83762 10.2125 10.2052 10.5133 10.2464 10.9254L10.7464 15.9254C10.7876 16.3376 10.4869 16.7051 10.0747 16.7463C9.66256 16.7875 9.29503 16.4868 9.25381 16.0747L8.75381 11.0747C8.7126 10.6625 9.01331 10.295 9.42546 10.2538Z" />
                                    <path d="M14.5747 10.2538C14.9869 10.295 15.2876 10.6625 15.2464 11.0747L14.7464 16.0747C14.7052 16.4868 14.3376 16.7875 13.9255 16.7463C13.5133 16.7051 13.2126 16.3376 13.2538 15.9254L13.7538 10.9254C13.795 10.5133 14.1626 10.2125 14.5747 10.2538Z" />
                                </svg>
                            </IconButton>
                        </div>
                    </div>
                </> ||
                <div id="no-timers-message-container">
                    <h1 className="no-timers-message">No timers sets</h1>
                    <h1 className="no-timers-message clickable"
                        onClick={() => { setIsModalOpened(true); setModalState('add'); }}>
                        Create new timers set
                    </h1>
                </div>
            }

            {/* Modals */}
            {
                isModalOpened && modalState === 'add' &&
                <AddTimerSetModal
                    isOpened={isModalOpened}
                    onClose={() => setIsModalOpened(false)}
                    addTimersSetCallback={addSetCallback} /> ||
                isModalOpened && modalState === 'edit' && selectedTimersSet &&
                <EditTimersSetModal
                    isOpened={isModalOpened}
                    onClose={() => setIsModalOpened(false)}
                    timersSet={selectedTimersSet}
                    editTimersSetCallback={editSetCallback} /> ||
                isModalOpened && modalState === 'delete' && selectedTimersSet &&
                <DeleteTimersSetModal
                    isOpened={isModalOpened}
                    onClose={() => setIsModalOpened(false)}
                    deleteTimersSetCallback={() => deleteSetCallback(selectedTimersSet)} />
            }
        </div >
    )
}

export default Timers
