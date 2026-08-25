import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NutritionPage.css';

// Тип для приёма пищи
interface Meal {
    id: number;
    name: string;
    time: string;
    calories: number;
    description: string;
    photo?: string;
    type?: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

// Тип для формы добавления
interface MealForm {
    type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    name: string;
    calories: string;
    description: string;
    photo: string | null;
}

const NutritionPage: React.FC = () => {
    const navigate = useNavigate();

    // ---------- СОСТОЯНИЯ ----------
    const [activeTab, setActiveTab] = useState<'all' | 'breakfast' | 'lunch' | 'dinner' | 'snack'>('all');
    const [showModal, setShowModal] = useState(false);
    const [meals, setMeals] = useState<Meal[]>([
        {
            id: 1,
            name: 'Овсянка с яблоком',
            time: '08:30',
            calories: 350,
            description: 'Овсяные хлопья, яблоко, орехи, мёд',
            photo: '🍳',
            type: 'breakfast',
        },
        {
            id: 2,
            name: 'Куриный суп',
            time: '13:15',
            calories: 280,
            description: 'Куриная грудка, овощи, зелень',
            photo: '🥣',
            type: 'lunch',
        },
        {
            id: 3,
            name: 'Творог с ягодами',
            time: '16:45',
            calories: 150,
            description: 'Творог 5%, малина, черника',
            photo: '🥄',
            type: 'snack',
        },
        {
            id: 4,
            name: 'Рыба с овощами',
            time: '19:30',
            calories: 320,
            description: 'Лосось, брокколи, цветная капуста',
            photo: '🐟',
            type: 'dinner',
        },
    ]);

    // Форма для нового приёма
    const [form, setForm] = useState<MealForm>({
        type: 'breakfast',
        name: '',
        calories: '',
        description: '',
        photo: null,
    });

    // ---------- ДАННЫЕ ----------
    const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
    const goalCalories = 1800;
    const remaining = goalCalories - totalCalories;

    // ---------- ФУНКЦИИ ----------
    const filteredMeals = () => {
        if (activeTab === 'all') return meals;
        return meals.filter((meal) => meal.type === activeTab);
    };

    const deleteMeal = (id: number) => {
        setMeals((prev) => prev.filter((meal) => meal.id !== id));
    };

    const getTabLabel = (tab: string) => {
        const labels: Record<string, string> = {
            all: '📋 Все',
            breakfast: '🍳 Завтрак',
            lunch: '🥗 Обед',
            dinner: '🌙 Ужин',
            snack: '🍎 Перекус',
        };
        return labels[tab] || tab;
    };

    // ----- Обработка формы -----
    const handleFormChange = (field: keyof MealForm, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setForm((prev) => ({ ...prev, photo: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.name.trim() || !form.calories.trim()) {
            alert('Пожалуйста, заполните название и калории');
            return;
        }

        const newMeal: Meal = {
            id: Date.now(),
            name: form.name,
            time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
            calories: parseInt(form.calories) || 0,
            description: form.description || '—',
            photo: form.photo || '📷',
            type: form.type,
        };

        setMeals((prev) => [...prev, newMeal]);
        setShowModal(false);
        setForm({ type: 'breakfast', name: '', calories: '', description: '', photo: null });
    };

    const closeModal = () => {
        setShowModal(false);
        setForm({ type: 'breakfast', name: '', calories: '', description: '', photo: null });
    };

    // ---------- RENDER ----------
    const displayedMeals = filteredMeals();

    return (
        <div className="nutrition-page">
            {/* ===== ЗАГОЛОВОК ===== */}
            <div className="nutrition-header">
                <h1 className="nutrition-title">🍽️ Питание</h1>
                <span style={{ fontSize: '20px' }}>📷</span>
            </div>
            <p className="nutrition-date">
                {new Date().toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                })}
            </p>

            {/* ===== ПРОГРЕСС КАЛОРИЙ ===== */}
            <div className="calorie-progress">
                <div className="calorie-stats">
                    <div className="calorie-numbers">
                        {totalCalories} <span>/ {goalCalories} ккал</span>
                    </div>
                    <div className="calorie-remaining">
                        {remaining >= 0 ? (
                            <span className="positive">+{remaining} осталось</span>
                        ) : (
                            <span className="negative">{remaining} перебор</span>
                        )}
                    </div>
                </div>
                <div className="progress-track">
                    <div
                        className="progress-fill-calories"
                        style={{
                            width: `${Math.min((totalCalories / goalCalories) * 100, 100)}%`,
                        }}
                    />
                </div>
            </div>

            {/* ===== ПЕРЕКЛЮЧАТЕЛЬ ===== */}
            <div className="meal-tabs">
                {['all', 'breakfast', 'lunch', 'dinner', 'snack'].map((tab) => (
                    <button
                        key={tab}
                        className={`meal-tab ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab as any)}
                    >
                        {getTabLabel(tab)}
                    </button>
                ))}
            </div>

            {/* ===== СПИСОК ПРИЁМОВ ===== */}
            {displayedMeals.length === 0 ? (
                <div
                    style={{
                        textAlign: 'center',
                        padding: '40px 0',
                        color: '#9ca3af',
                        fontSize: '14px',
                    }}
                >
                    🍽️ Нет приёмов пищи в этой категории
                </div>
            ) : (
                displayedMeals.map((meal) => (
                    <div key={meal.id} className="meal-card">
                        <div className="meal-header">
                            <p className="meal-name">{meal.name}</p>
                            <span className="meal-time">{meal.time}</span>
                        </div>
                        <div className="meal-body">
                            <div className="meal-photo">{meal.photo || '📷'}</div>
                            <div className="meal-info">
                                <p className="meal-calories">🔥 {meal.calories} ккал</p>
                                <p>{meal.description}</p>
                            </div>
                        </div>
                        <div className="meal-actions">
                            <button className="edit-btn">✎ Редактировать</button>
                            <button className="delete-btn" onClick={() => deleteMeal(meal.id)}>
                                ✕ Удалить
                            </button>
                        </div>
                    </div>
                ))
            )}

            {/* ===== КНОПКА ДОБАВИТЬ ===== */}
            <button className="add-meal-btn" onClick={() => setShowModal(true)}>
                + Добавить приём пищи
            </button>

            {/* ===== РЕКОМЕНДАЦИЯ ===== */}
            <div className="recommendation-card">
                <div className="recommendation-icon">💡</div>
                <div>
                    <p className="recommendation-label">Совет дня</p>
                    <p className="recommendation-text">
                        Сегодня фолликулярная фаза. Добавь в рацион больше белков и сложных углеводов.
                    </p>
                </div>
            </div>

            {/* ============================================================
          МОДАЛЬНОЕ ОКНО ДЛЯ ДОБАВЛЕНИЯ
          ============================================================ */}
            {showModal && (
                <>
                    {/* Затемнение фона */}
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            backdropFilter: 'blur(4px)',
                            zIndex: 999,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '20px',
                        }}
                        onClick={closeModal}
                    >
                        {/* Само модальное окно */}
                        <div
                            style={{
                                backgroundColor: '#ffffff',
                                borderRadius: '24px',
                                padding: '24px',
                                maxWidth: '400px',
                                width: '100%',
                                maxHeight: '90vh',
                                overflowY: 'auto',
                                position: 'relative',
                                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h2
                                style={{
                                    fontSize: '20px',
                                    fontWeight: '700',
                                    color: '#1f2937',
                                    margin: '0 0 4px 0',
                                }}
                            >
                                ✏️ Добавить приём
                            </h2>
                            <p
                                style={{
                                    fontSize: '14px',
                                    color: '#6b7280',
                                    margin: '0 0 20px 0',
                                }}
                            >
                                Заполните информацию о блюде
                            </p>

                            <form onSubmit={handleSubmit}>
                                {/* Тип приёма */}
                                <div style={{ marginBottom: '16px' }}>
                                    <label
                                        style={{
                                            display: 'block',
                                            fontSize: '14px',
                                            fontWeight: '500',
                                            color: '#374151',
                                            marginBottom: '4px',
                                        }}
                                    >
                                        Тип приёма
                                    </label>
                                    <select
                                        value={form.type}
                                        onChange={(e) => handleFormChange('type', e.target.value as any)}
                                        style={{
                                            width: '100%',
                                            padding: '10px 12px',
                                            border: '1px solid #d1d5db',
                                            borderRadius: '12px',
                                            fontSize: '14px',
                                            background: '#ffffff',
                                            color: '#1f2937',
                                            fontFamily: 'inherit',
                                        }}
                                    >
                                        <option value="breakfast">🍳 Завтрак</option>
                                        <option value="lunch">🥗 Обед</option>
                                        <option value="dinner">🌙 Ужин</option>
                                        <option value="snack">🍎 Перекус</option>
                                    </select>
                                </div>

                                {/* Название блюда */}
                                <div style={{ marginBottom: '16px' }}>
                                    <label
                                        style={{
                                            display: 'block',
                                            fontSize: '14px',
                                            fontWeight: '500',
                                            color: '#374151',
                                            marginBottom: '4px',
                                        }}
                                    >
                                        Название блюда *
                                    </label>
                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={(e) => handleFormChange('name', e.target.value)}
                                        placeholder="Например: Овсянка с яблоком"
                                        style={{
                                            width: '100%',
                                            padding: '10px 12px',
                                            border: '1px solid #d1d5db',
                                            borderRadius: '12px',
                                            fontSize: '14px',
                                            background: '#ffffff',
                                            color: '#1f2937',
                                            fontFamily: 'inherit',
                                        }}
                                        required
                                    />
                                </div>

                                {/* Калории */}
                                <div style={{ marginBottom: '16px' }}>
                                    <label
                                        style={{
                                            display: 'block',
                                            fontSize: '14px',
                                            fontWeight: '500',
                                            color: '#374151',
                                            marginBottom: '4px',
                                        }}
                                    >
                                        Калории (ккал) *
                                    </label>
                                    <input
                                        type="number"
                                        value={form.calories}
                                        onChange={(e) => handleFormChange('calories', e.target.value)}
                                        placeholder="например: 350"
                                        style={{
                                            width: '100%',
                                            padding: '10px 12px',
                                            border: '1px solid #d1d5db',
                                            borderRadius: '12px',
                                            fontSize: '14px',
                                            background: '#ffffff',
                                            color: '#1f2937',
                                            fontFamily: 'inherit',
                                        }}
                                        required
                                    />
                                </div>

                                {/* Описание */}
                                <div style={{ marginBottom: '16px' }}>
                                    <label
                                        style={{
                                            display: 'block',
                                            fontSize: '14px',
                                            fontWeight: '500',
                                            color: '#374151',
                                            marginBottom: '4px',
                                        }}
                                    >
                                        Описание (ингредиенты)
                                    </label>
                                    <input
                                        type="text"
                                        value={form.description}
                                        onChange={(e) => handleFormChange('description', e.target.value)}
                                        placeholder="Овсяные хлопья, яблоко, мёд..."
                                        style={{
                                            width: '100%',
                                            padding: '10px 12px',
                                            border: '1px solid #d1d5db',
                                            borderRadius: '12px',
                                            fontSize: '14px',
                                            background: '#ffffff',
                                            color: '#1f2937',
                                            fontFamily: 'inherit',
                                        }}
                                    />
                                </div>

                                {/* Фото */}
                                <div style={{ marginBottom: '20px' }}>
                                    <label
                                        style={{
                                            display: 'block',
                                            fontSize: '14px',
                                            fontWeight: '500',
                                            color: '#374151',
                                            marginBottom: '4px',
                                        }}
                                    >
                                        Фото тарелки
                                    </label>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                        }}
                                    >
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handlePhotoUpload}
                                            style={{
                                                flex: 1,
                                                padding: '8px',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '12px',
                                                fontSize: '14px',
                                                fontFamily: 'inherit',
                                            }}
                                        />
                                        {form.photo && (
                                            <span
                                                style={{
                                                    fontSize: '14px',
                                                    color: '#10b981',
                                                    fontWeight: '500',
                                                }}
                                            >
                        ✅
                      </span>
                                        )}
                                    </div>
                                    {form.photo && (
                                        <div
                                            style={{
                                                marginTop: '8px',
                                                fontSize: '12px',
                                                color: '#6b7280',
                                            }}
                                        >
                                            📸 Фото загружено
                                        </div>
                                    )}
                                </div>

                                {/* Кнопки */}
                                <div
                                    style={{
                                        display: 'flex',
                                        gap: '10px',
                                    }}
                                >
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        style={{
                                            flex: 1,
                                            padding: '12px',
                                            border: '1px solid #d1d5db',
                                            borderRadius: '12px',
                                            background: 'transparent',
                                            color: '#4b5563',
                                            fontSize: '15px',
                                            fontWeight: '500',
                                            cursor: 'pointer',
                                            fontFamily: 'inherit',
                                        }}
                                    >
                                        Отмена
                                    </button>
                                    <button
                                        type="submit"
                                        style={{
                                            flex: 2,
                                            padding: '12px',
                                            border: 'none',
                                            borderRadius: '12px',
                                            background: '#ec4899',
                                            color: '#ffffff',
                                            fontSize: '15px',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            fontFamily: 'inherit',
                                        }}
                                    >
                                        ✅ Добавить
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            )}

            {/* ===== НИЖНЯЯ НАВИГАЦИЯ ===== */}
            <nav className="nutrition-bottom-nav">
                <button className="nutrition-nav-item" onClick={() => navigate('/')}>
                    <span className="nutrition-nav-icon">🏠</span>
                    <span className="nutrition-nav-label">Главная</span>
                </button>
                <button className="nutrition-nav-item active">
                    <span className="nutrition-nav-icon">🍽️</span>
                    <span className="nutrition-nav-label">Питание</span>
                </button>
                <button className="nutrition-nav-item" onClick={() => navigate('/workout')}>
                    <span className="nutrition-nav-icon">🏋️</span>
                    <span className="nutrition-nav-label">Тренировки</span>
                </button>
                <button className="nutrition-nav-item" onClick={() => navigate('/calendar')}>
                    <span className="nutrition-nav-icon">📊</span>
                    <span className="nutrition-nav-label">Календарь</span>
                </button>
                <button className="nutrition-nav-item" onClick={() => navigate('/profile')}>
                    <span className="nutrition-nav-icon">👤</span>
                    <span className="nutrition-nav-label">Профиль</span>
                </button>
            </nav>
        </div>
    );
};

export default NutritionPage;