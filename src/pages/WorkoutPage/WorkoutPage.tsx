import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './WorkoutPage.css';

// Тип для упражнения
interface Exercise {
    id: number;
    name: string;
    muscle: string;
    type: 'strength' | 'cardio' | 'stretching';
    icon: string;
    sets?: number;
    reps?: number;
    duration?: number; // для кардио (в секундах)
    completed: boolean;
    phase: string;
}

const WorkoutPage: React.FC = () => {
    const navigate = useNavigate();
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [timerRunning, setTimerRunning] = useState<number | null>(null);
    const [timerSeconds, setTimerSeconds] = useState<number>(0);

    // ---------- ЗАГРУЗКА ДАННЫХ ----------
    useEffect(() => {
        // В реальном приложении данные будут приходить с бэкенда
        // в зависимости от фазы цикла пользователя
        const mockExercises: Exercise[] = [
            {
                id: 1,
                name: 'Приседания с гантелями',
                muscle: 'Ноги, Ягодицы',
                type: 'strength',
                icon: '🦵',
                sets: 4,
                reps: 10,
                completed: false,
                phase: 'follicular',
            },
            {
                id: 2,
                name: 'Жим гантелей лежа',
                muscle: 'Грудь, Трицепс',
                type: 'strength',
                icon: '💪',
                sets: 3,
                reps: 8,
                completed: false,
                phase: 'follicular',
            },
            {
                id: 3,
                name: 'Тяга гантели в наклоне',
                muscle: 'Спина',
                type: 'strength',
                icon: '🔙',
                sets: 3,
                reps: 12,
                completed: false,
                phase: 'follicular',
            },
            {
                id: 4,
                name: 'Планка',
                muscle: 'Пресс, Кор',
                type: 'stretching',
                icon: '🧘',
                sets: 3,
                reps: 30, // 30 секунд
                completed: false,
                phase: 'follicular',
            },
            {
                id: 5,
                name: 'Бег на месте',
                muscle: 'Кардио',
                type: 'cardio',
                icon: '🏃',
                duration: 300, // 5 минут
                completed: false,
                phase: 'follicular',
            },
        ];
        setExercises(mockExercises);
    }, []);

    // ---------- ТАЙМЕР ----------
    useEffect(() => {
        let interval: number | null = null;
        if (timerRunning !== null) {
            interval = window.setInterval(() => {
                setTimerSeconds((prev) => prev + 1);
            }, 1000);
        } else {
            setTimerSeconds(0);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [timerRunning]);

    // ---------- ФУНКЦИИ ----------
    const toggleExercise = (id: number) => {
        setExercises((prev) =>
            prev.map((ex) =>
                ex.id === id ? { ...ex, completed: !ex.completed } : ex
            )
        );
    };

    const startTimer = (id: number) => {
        setTimerRunning(id);
    };

    const stopTimer = () => {
        setTimerRunning(null);
    };

    const isAllCompleted = () => {
        return exercises.every((ex) => ex.completed);
    };

    // ---------- RENDER ----------
    return (
        <div className="workout-page">
            {/* ===== ЗАГОЛОВОК ===== */}
            <div className="workout-header">
                <h1 className="workout-title">🏋️ Тренировка</h1>
                <span className="workout-phase-badge">🌱 Фолликулярная</span>
            </div>
            <p className="workout-subtitle">Силовая программа • 5 упражнений</p>

            {/* ===== СПИСОК УПРАЖНЕНИЙ ===== */}
            {exercises.map((exercise) => (
                <div
                    key={exercise.id}
                    className={`exercise-card ${exercise.completed ? 'completed' : ''}`}
                >
                    <div className="exercise-header">
                        <div>
                            <p className="exercise-name">{exercise.name}</p>
                            <p className="exercise-muscle">{exercise.muscle}</p>
                        </div>
                        <span className={`exercise-badge ${exercise.type}`}>
              {exercise.type === 'strength' && '💪 Силовое'}
                            {exercise.type === 'cardio' && '🏃 Кардио'}
                            {exercise.type === 'stretching' && '🧘 Растяжка'}
            </span>
                    </div>

                    <div className="exercise-scheme">
                        <div className="exercise-image">{exercise.icon}</div>
                        <div className="exercise-details">
                            {exercise.type === 'strength' && (
                                <>
                                    <p className="sets-info">
                                        {exercise.sets} × {exercise.reps} повторений
                                    </p>
                                    <p>⏱️ Отдых 60 сек</p>
                                </>
                            )}
                            {exercise.type === 'cardio' && (
                                <>
                                    <p className="sets-info">
                                        ⏱️ {Math.floor((exercise.duration || 0) / 60)} минут
                                    </p>
                                    {timerRunning === exercise.id && (
                                        <p>⏳ {timerSeconds} сек</p>
                                    )}
                                </>
                            )}
                            {exercise.type === 'stretching' && (
                                <p className="sets-info">
                                    🧘 {exercise.reps} секунд на удержание
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="exercise-actions">
                        {exercise.type === 'cardio' ? (
                            timerRunning === exercise.id ? (
                                <button className="timer-btn running" onClick={stopTimer}>
                                    ⏹️ Остановить ({timerSeconds} сек)
                                </button>
                            ) : (
                                <button
                                    className="timer-btn"
                                    onClick={() => startTimer(exercise.id)}
                                    disabled={exercise.completed}
                                >
                                    ▶️ Старт
                                </button>
                            )
                        ) : (
                            <button
                                className={`complete-btn ${exercise.completed ? 'done' : ''}`}
                                onClick={() => toggleExercise(exercise.id)}
                            >
                                {exercise.completed ? '✅ Выполнено' : '⬜ Выполнить'}
                            </button>
                        )}
                    </div>
                </div>
            ))}

            {/* ===== КНОПКА ЗАВЕРШИТЬ ===== */}
            <button
                className="finish-workout-btn"
                disabled={!isAllCompleted()}
                onClick={() => alert('🎉 Тренировка завершена!')}
            >
                {isAllCompleted() ? '🎉 Завершить тренировку' : 'Выполните все упражнения'}
            </button>

            {/* ===== НИЖНЯЯ НАВИГАЦИЯ ===== */}
            <nav className="workout-bottom-nav">
                <button className="workout-nav-item" onClick={() => navigate('/')}>
                    <span className="workout-nav-icon">🏠</span>
                    <span className="workout-nav-label">Главная</span>
                </button>
                <button className="workout-nav-item" onClick={() => navigate('/nutrition')}>
                    <span className="workout-nav-icon">🍽️</span>
                    <span className="workout-nav-label">Питание</span>
                </button>
                <button className="workout-nav-item active">
                    <span className="workout-nav-icon">🏋️</span>
                    <span className="workout-nav-label">Тренировки</span>
                </button>
                <button className="workout-nav-item" onClick={() => navigate('/calendar')}>
                    <span className="workout-nav-icon">📊</span>
                    <span className="workout-nav-label">Календарь</span>
                </button>
                <button className="workout-nav-item" onClick={() => navigate('/profile')}>
                    <span className="workout-nav-icon">👤</span>
                    <span className="workout-nav-label">Профиль</span>
                </button>
            </nav>
        </div>
    );
};

export default WorkoutPage;