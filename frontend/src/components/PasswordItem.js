// PasswordItem.js
import './index.css';
//import './index_passwordItem.css'

const PasswordItem = ({ record, deletePasswordRecord, showPassword }) => {
  const { id, url, name, password } = record;

  return (
    <li className="password-item">
      <div>
        <p>{url}</p>
        <p>{name}</p>
        <p>{showPassword ? password : '******'}</p>
      </div>
      <button onClick={() => deletePasswordRecord(id)}>Delete</button>
    </li>
  );
};

export default PasswordItem;
