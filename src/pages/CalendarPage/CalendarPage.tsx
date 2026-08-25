import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CalendarPage.css';

const CalendarPage: React.FC = () => {
    const navigate = useNavigate();

    // ---------- СОСТОЯНИЯ ----------
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState<number | null>(8); // 8-е число
    const [activeTab, setActiveTab] = useState<'cycle' | 'mood'>('cycle');

    // ---------- ДАННЫЕ (заглушки) ----------
    const cycleData: Record<number, string> = {
        1: 'menstruation',
        2: 'menstruation',
        3: 'menstruation',
        4: 'menstruation',
        5: 'menstruation',
        6: 'follicular',
        7: 'follicular',
        8: 'follicular',
        9: 'follicular',
        10: 'follicular',
        11: 'follicular',
        12: 'follicular',
        13: 'follicular',
        14: 'ovulation',
        15: 'ovulation',
        16: 'luteal',
        17: 'luteal',
        18: 'luteal',
        19: 'luteal',
        20: 'luteal',
        21: 'luteal',
        22: 'luteal',
        23: 'luteal',
        24: 'luteal',
        25: 'luteal',
        26: 'luteal',
        27: 'luteal',
        28: 'luteal',
    };

    const moodData: Record<number, string> = {
        1: 'happy',
        5: 'neutral',
        8: 'happy',
        10: 'anxious',
        12: 'neutral',
        14: 'happy',
        16: 'sad',
        18: 'angry',
        20: 'neutral',
        22: 'sad',
        25: 'neutral',
        27: 'anxious',
    };

    const dayNotes: Record<number, string> = {
        8: 'Хороший день! Прогулка в парке.',
        14: 'Много энергии, отличная тренировка.',
        16: 'Чувствую усталость, но всё хорошо.',
    };

    // ---------- ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ----------
    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        return { firstDay, daysInMonth };
    };

    const changeMonth = (delta: number) => {
        const newDate = new Date(currentMonth);
        newDate.setMonth(newDate.getMonth() + delta);
        setCurrentMonth(newDate);
    };

    const formatMonth = (date: Date) => {
        return date.toLocaleString('ru-RU', { month: 'long', year: 'numeric' });
    };

    const getDayClass = (day: number, isCurrentMonth: boolean) => {
        if (!isCurrentMonth) return 'calendar-day other-month';

        const today = new Date();
        const isToday =
            today.getDate() === day &&
            today.getMonth() === currentMonth.getMonth() &&
            today.getFullYear() === currentMonth.getFullYear();

        let classes = 'calendar-day';
        if (isToday) classes += ' today';

        if (activeTab === 'cycle') {
            const phase = cycleData[day];
            if (phase === 'menstruation') classes += ' cycle-menstruation';
            else if (phase === 'follicular') classes += ' cycle-follicular';
            else if (phase === 'ovulation') classes += ' cycle-ovulation';
            else if (phase === 'luteal') classes += ' cycle-luteal';
        } else {
            const mood = moodData[day];
            if (mood === 'happy') classes += ' mood-happy';
            else if (mood === 'neutral') classes += ' mood-neutral';
            else if (mood === 'sad') classes += ' mood-sad';
            else if (mood === 'angry') classes += ' mood-angry';
            else if (mood === 'anxious') classes += ' mood-anxious';
        }

        return classes;
    };

    const renderDayInfo = () => {
        if (!selectedDay) return null;

        const day = selectedDay;
        const phase = cycleData[day];
        const mood = moodData[day];
        const note = dayNotes[day];

        const phaseLabels: Record<string, string> = {
            menstruation: '🩸 Менструальная',
            follicular: '🌱 Фолликулярная',
            ovulation: '🌸 Овуляция',
            luteal: '🌊 Лютеиновая',
        };

        const moodLabels: Record<string, string> = {
            happy: '😊 Отлично',
            neutral: '😐 Нормально',
            sad: '😢 Грустно',
            angry: '😤 Раздражение',
            anxious: '😰 Тревога',
        };

        return (
            <div className="calendar-day-info">
                <p className="day-info-date">
                    {day} {formatMonth(currentMonth)}
                </p>
                <div className="day-info-row">
                    <span className="emoji">🌙</span>
                    <span>{phaseLabels[phase] || '—'}</span>
                </div>
                <div className="day-info-row">
                    <span className="emoji">😊</span>
                    <span>{moodLabels[mood] || '—'}</span>
                </div>
                {note && (
                    <div className="day-info-notes">📝 {note}</div>
                )}
            </div>
        );
    };

    // ---------- RENDER ----------
    const { firstDay, daysInMonth } = getDaysInMonth(currentMonth);

    return (
        <div className="calendar-page">
            {/* ===== ЗАГОЛОВОК ===== */}
            <div className="calendar-header">
                <h1 className="calendar-title">Календарь</h1>
                <div className="calendar-month-nav">
                    <button onClick={() => changeMonth(-1)}>‹</button>
                    <span className="calendar-month-label">
            {formatMonth(currentMonth)}
          </span>
                    <button onClick={() => changeMonth(1)}>›</button>
                </div>
            </div>

            {/* ===== ПЕРЕКЛЮЧАТЕЛЬ ===== */}
            <div className="calendar-tabs">
                <button
                    className={`calendar-tab ${activeTab === 'cycle' ? 'active' : ''}`}
                    onClick={() => setActiveTab('cycle')}
                >
                    🌸 Цикл
                </button>
                <button
                    className={`calendar-tab ${activeTab === 'mood' ? 'active' : ''}`}
                    onClick={() => setActiveTab('mood')}
                >
                    😊 Настроение
                </button>
            </div>

            {/* ===== СЕТКА ===== */}
            <div className="calendar-grid">
                <div className="calendar-weekdays">
                    {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => (
                        <div key={day} className="calendar-weekday">{day}</div>
                    ))}
                </div>

                <div className="calendar-days">
                    {Array.from({ length: firstDay === 0 ? 6 : firstDay - 1 }).map((_, i) => (
                        <div key={`empty-${i}`} className="calendar-day other-month" />
                    ))}

                    {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day = i + 1;
                        const isCurrentMonth = true;
                        return (
                            <button
                                key={day}
                                className={getDayClass(day, isCurrentMonth)}
                                onClick={() => setSelectedDay(day)}
                            >
                                {day}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* ===== ИНФОРМАЦИЯ О ДНЕ ===== */}
            {renderDayInfo()}

            {/* ===== НИЖНЯЯ НАВИГАЦИЯ ===== */}
            <nav className="calendar-bottom-nav">
                <button className="calendar-nav-item" onClick={() => navigate('/')}>
                    <span className="calendar-nav-icon">🏠</span>
                    <span className="calendar-nav-label">Главная</span>
                </button>
                <button className="calendar-nav-item" onClick={() => navigate('/nutrition')}>
                    <span className="calendar-nav-icon">🍽️</span>
                    <span className="calendar-nav-label">Питание</span>
                </button>
                <button className="calendar-nav-item" onClick={() => navigate('/workout')}>
                    <span className="calendar-nav-icon">🏋️</span>
                    <span className="calendar-nav-label">Тренировки</span>
                </button>
                <button className="calendar-nav-item active">
                    <span className="calendar-nav-icon">📊</span>
                    <span className="calendar-nav-label">Календарь</span>
                </button>
                <button className="calendar-nav-item" onClick={() => navigate('/profile')}>
                    <span className="calendar-nav-icon">👤</span>
                    <span className="calendar-nav-label">Профиль</span>
                </button>
            </nav>
        </div>
    );
};

export default CalendarPage;