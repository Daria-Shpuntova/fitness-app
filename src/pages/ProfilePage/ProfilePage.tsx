import React from 'react';
import './ProfilePage.css';
import {useNavigate} from "react-router-dom";

const ProfilePage: React.FC = () => {
    const navigate = useNavigate();
    // Данные пользователя (позже будут из API)
    const user = {
        name: 'Алина',
        email: 'alina@example.com',
        avatarInitial: 'А',
    };

    const settings = [
        {
            id: 1,
            icon: '⏰',
            iconBg: 'blue',
            label: 'Время пробуждения',
            value: '07:00',
        },
        {
            id: 2,
            icon: '🔔',
            iconBg: 'pink',
            label: 'Уведомления',
            value: 'Включены',
        },
        {
            id: 3,
            icon: '🍽️',
            iconBg: 'green',
            label: 'Любимые продукты',
            value: 'Курица, гречка, яблоки',
        },
        {
            id: 4,
            icon: '🚫',
            iconBg: 'yellow',
            label: 'Не люблю',
            value: 'Рыба, грибы, молоко',
        },
        {
            id: 5,
            icon: '🏋️',
            iconBg: 'purple',
            label: 'Доступный инвентарь',
            value: 'Гантели, резинка, коврик',
        },
    ];

    const stats = [
        { number: 12, label: 'Дней в приложении' },
        { number: 8, label: 'Тренировок' },
        { number: '6/12', label: 'Планов выполнено' },
    ];

    return (
        <div className="profile-page">
            {/* ===== ЗАГОЛОВОК С АВАТАРОМ ===== */}
            <div className="profile-header">
                <div className="profile-avatar">{user.avatarInitial}</div>
                <p className="profile-name">{user.name}</p>
                <p className="profile-email">{user.email}</p>
            </div>

            {/* ===== НАСТРОЙКИ ===== */}
            {settings.map((item) => (
                <div key={item.id} className="settings-card">
                    <div className="settings-left">
                        <div className={`settings-icon ${item.iconBg}`}>{item.icon}</div>
                        <div>
                            <p className="settings-label">{item.label}</p>
                            <p className="settings-value">{item.value}</p>
                        </div>
                    </div>
                    <button className="settings-action">✎</button>
                </div>
            ))}

            {/* ===== СТАТИСТИКА ===== */}
            <div className="stats-block">
                <p className="stats-title">📊 Статистика</p>
                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <div key={index} className="stat-item">
                            <p className="stat-number">{stat.number}</p>
                            <p className="stat-label">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ===== КНОПКА ВЫХОДА ===== */}
            <button className="logout-button">🚪 Выйти из аккаунта</button>

            {/* ===== НИЖНЯЯ НАВИГАЦИЯ ===== */}
            <nav className="bottom-nav">
                <button className="nav-item" onClick={() => navigate('/')}>
                    <span className="nav-icon">🏠</span>
                    <span className="nav-label">Главная</span>
                </button>
                <button className="nav-item" onClick={() => navigate('/nutrition')}>
                    <span className="nav-icon">🍽️</span>
                    <span className="nav-label">Питание</span>
                </button>
                <button className="nav-item" onClick={() => navigate('/workout')}>
                    <span className="nav-icon">🏋️</span>
                    <span className="nav-label">Тренировки</span>
                </button>
                <button className="nav-item" onClick={() => navigate('/calendar')}>
                    <span className="nav-icon">📊</span>
                    <span className="nav-label">Календарь</span>
                </button>
                <button className="nav-item active">
                    <span className="nav-icon">👤</span>
                    <span className="nav-label">Профиль</span>
                </button>
            </nav>
        </div>
    );
};

export default ProfilePage;