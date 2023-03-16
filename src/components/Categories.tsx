import React from 'react';

type CategoriesProps = {
  value: number;
  onChangeCategory: (index: number) => void;
};

export const Categories: React.FC<CategoriesProps> = React.memo(
  ({ value, onChangeCategory }) => {
    const categories = [
      'Все',
      'Мясные',
      'Вегетарианская',
      'Гриль',
      'Острые',
      'Закрытые',
    ];

    return (
      <div className="categories">
        <ul>
          {categories.map((category, index) => (
            <li
              key={index}
              onClick={() => onChangeCategory(index)}
              className={value === index ? 'active' : ''}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);
