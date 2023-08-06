import { useTranslation } from 'react-i18next';

const TodoListHeader = ({ taskCount }) => {
  const { t } = useTranslation();

  return <div className="header">{t('todoListHeader', { count: taskCount })}</div>;
};

export default TodoListHeader;