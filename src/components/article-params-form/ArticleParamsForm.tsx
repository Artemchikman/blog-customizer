import { useState, useEffect, useRef } from 'react';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { RadioGroup } from 'components/radio-group';
import { Select } from 'components/select';
import styles from './ArticleParamsForm.module.scss';
import { Text } from '../text';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

// Определяем типы для пропсов компонента ArticleParamsForm.
type ArticleParamsFormProps = {
	onApply: (newState: ArticleStateType) => void; // Функция обработки изменения состояния статьи
};

// Основной компонент ArticleParamsForm
export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	// Инициализируем состояния компонента:
	const [isOpen, setIsOpen] = useState(false); // Состояние для управления открытием/закрытием сайдбара
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState); // Состояние формы, инициализируем значениями по умолчанию
	const sidebarRef = useRef<HTMLDivElement>(null); // Хук useRef для ссылки на элемент сайдбара

	// Функция для переключения состояния сайдбара.
	const toggleOpen = () => {
		setIsOpen(!isOpen); // Меняем состояние isOpen на противоположное
	};

	// Функция для сброса состояния формы до значений по умолчанию.
	const resetForm = () => {
		setFormState(defaultArticleState); // Устанавливаем состояние на значения по умолчанию
	};

	// Функция для применения изменений, полученных из формы.
	const applyChanges = (event: React.FormEvent) => {
		event.preventDefault(); // Предотвращаем стандартное поведение формы (перезагрузку страницы)
		onApply(formState); // Вызываем функцию обработки с новыми значениями состояния
		setIsOpen(false); // Закрываем сайдбар после применения изменений
	};

	// Функция для обновления состояния формы при изменении значений.
	const handleChange = <K extends keyof ArticleStateType>(
		key: K,
		value: ArticleStateType[K]
	) => {
		setFormState((prevState) => ({
			...prevState, // Сохраняем предыдущее состояние
			[key]: value, // Обновляем конкретное значение состояния
		}));
	};

	// Эффект для закрытия сайдбара при клике вне его области или нажатии клавиши Escape.
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			// Проверяем, был ли клик вне области сайдбара
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				setIsOpen(false); // Если да, закрываем сайдбар
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setIsOpen(false); // Закрываем при нажатии Escape
			}
		};

		// Добавляем обработчики событий для кликов и нажатий клавиш
		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleKeyDown);

		// Функция очистки, когда компонент размонтируется
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, []); // Эффект выполняется только при монтировании и размонтировании компонента

	return (
		<>
			<ArrowButton onClick={toggleOpen} isOpen={isOpen} />
			{/* Кнопка для открытия/закрытия сайдбара */}
			<aside
				className={`${styles.container} ${isOpen ? styles.container_open : ''}`}
				ref={sidebarRef}>
				{/* Сайдбар с формой параметров статьи */}
				<form className={styles.form} onSubmit={applyChanges}>
					<Text as={'h2'} size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions} // Опции шрифтов
						selected={formState.fontFamilyOption} // Выбранный шрифт
						onChange={(option) => handleChange('fontFamilyOption', option)} // Обработка изменения шрифта
						placeholder='Шрифт' // Плейсхолдер
						title='Шрифт' // Название выбора
					/>
					<RadioGroup
						name='fontSize' // Имя группы радиокнопок
						options={fontSizeOptions} // Опции размеров шрифта
						selected={formState.fontSizeOption} // Выбранный размер шрифта
						onChange={(option) => handleChange('fontSizeOption', option)} // Обработка изменения размера шрифта
						title='Размер шрифта' // Название группы
					/>
					<Select
						options={fontColors} // Опции цветов шрифта
						selected={formState.fontColor} // Выбранный цвет шрифта
						onChange={(option) => handleChange('fontColor', option)} // Обработка изменения цвета шрифта
						placeholder='Цвет шрифта' // Плейсхолдер
						title='Цвет шрифта' // Название выбора
					/>
					<Select
						options={backgroundColors} // Опции цветов фона
						selected={formState.backgroundColor} // Выбранный цвет фона
						onChange={(option) => handleChange('backgroundColor', option)} // Обработка изменения цвета фона
						placeholder='Цвет фона' // Плейсхолдер
						title='Цвет фона' // Название выбора
					/>
					<Select
						options={contentWidthArr} // Опции ширины контента
						selected={formState.contentWidth} // Выбранная ширина контента
						onChange={(option) => handleChange('contentWidth', option)} // Обработка изменения ширины контента
						placeholder='Ширина контента' // Плейсхолдер
						title='Ширина контента' // Название выбора
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={resetForm} />{' '}
						{/* Кнопка для сброса параметров */}
						<Button title='Применить' type='submit' />{' '}
						{/* Кнопка для применения параметров */}
					</div>
				</form>
			</aside>
		</>
	);
};
