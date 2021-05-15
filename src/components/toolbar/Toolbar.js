import ToolbarButton from './ToolbarButton';
import './Toolbar.css';

const Toolbar = () => {
  return (
    <div className="toolbar-container">
      <ToolbarButton />
      <ToolbarButton />
      <ToolbarButton />
      <ToolbarButton />
    </div>
  )
}

export default Toolbar;