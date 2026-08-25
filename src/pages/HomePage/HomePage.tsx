import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // ← Подключаем CSS-файл

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    
    const user = { name: 'Алина' };
    const phase = {
        name: 'Фолликулярная фаза',
        icon: '🌱',
        day: 8,
        total: 28,
    };

    // Рассчитываем прогресс в процентах
    const progressPercent = Math.round((phase.day / phase.total) * 100);

    return (
        <div className="home-page">
            {/* ===== ШАПКА ===== */}
            <header className="header">
                <div>
                    <p className="greeting">Доброе утро,</p>
                    <p className="user-name">{user.name}</p>
                </div>
                <div className="avatar">{user.name[0]}</div>
            </header>

            {/* ===== КАРТОЧКА ФАЗЫ ===== */}
            <section className="phase-card">
                <div className="phase-content">
                    <div className="phase-icon-wrapper">{phase.icon}</div>
                    <div className="phase-info">
                        <p className="phase-name">{phase.name}</p>
                        <p className="phase-day">
                            День {phase.day} из {phase.total}
                        </p>
                    </div>
                </div>
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{width: `${progressPercent}%`}}
                    />
                </div>
            </section>

            {/* ===== АФФИРМАЦИЯ ===== */}
            <section className="affirmation-card">
                <p className="affirmation-text">
                    "Твоя энергия возвращается. Начни день с улыбки."
                </p>
            </section>

            {/* ===== ВИДЖЕТЫ ===== */}
            <div className="widget-grid">
                <div className="widget-item">
                    <div className="widget-icon">🍽️</div>
                    <p className="widget-number">850</p>
                    <p className="widget-label">ккал</p>
                    <p className="widget-sub">из 1800</p>
                </div>
                <div className="widget-item">
                    <div className="widget-icon">🏋️</div>
                    <p className="widget-number">3</p>
                    <p className="widget-label">подхода</p>
                    <p className="widget-sub">из 4</p>
                </div>
                <div className="widget-item">
                    <div className="widget-icon">📅</div>
                    <p className="widget-number">{phase.day}</p>
                    <p className="widget-label">день</p>
                    <p className="widget-sub">цикла</p>
                </div>
            </div>

            {/* ===== НАПОМИНАНИЕ ===== */}
            <div className="reminder-card">
                <div className="reminder-icon">💡</div>
                <div>
                    <p className="reminder-label">Совет дня</p>
                    <p className="reminder-text">До месячных 3 дня. Добавь магний.</p>
                </div>
            </div>

            {/* ===== НИЖНЯЯ НАВИГАЦИЯ ===== */}
            <nav className="bottom-nav">
                <button className="nav-item active">
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
                <button className="nav-item" onClick={() => navigate('/profile')}>
                    <span className="nav-icon">👤</span>
                    <span className="nav-label">Профиль</span>
                </button>
            </nav>
        </div>
    );
};

export default HomePage;