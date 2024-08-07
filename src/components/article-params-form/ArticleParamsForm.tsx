import { useState } from 'react';
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
import { useOutsideClick } from '../select/hooks/useOutsideClick'; // Импорт кастомного хука
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
	const sidebarRef = useOutsideClick(() => setIsOpen(false)); // Использование хука

	// Функция для переключения состояния сайдбара.
	const toggleOpen = () => {
		setIsOpen(!isOpen); // Меняем состояние isOpen на противоположное
	};

	// Функция для сброса состояния формы до значений по умолчанию.
	const resetForm = () => {
		setFormState(defaultArticleState); // Устанавливаем состояние на значения по умолчанию
		onApply(defaultArticleState); // Сбрасываем состояние статьи
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
