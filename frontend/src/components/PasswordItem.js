//// PasswordItem.js
//import './index.css';
////import './index_passwordItem.css'
//
//const PasswordItem = ({ record, deletePasswordRecord, showPassword }) => {
//  const { id, url, name, password } = record;
//
//  return (
//    <li className="password-item">
//      <div>
//        <p>{url}</p>
//        <p>{name}</p>
//        <p>{showPassword ? password : '******'}</p>
//      </div>
//      <button onClick={() => deletePasswordRecord(id)}>Delete</button>
//    </li>
//  );
//};
//
//export default PasswordItem;

// PasswordItem.js
import './index.css';

const PasswordItem = ({ record, deletePasswordRecord, showPassword }) => {
  const { id, url, name, password } = record;

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    alert('Password copied to clipboard!'); // Optional: Alert user that password is copied
  };

  return (
    <li className="password-item">
      <div>
        <p>{url}</p>
        <p>{name}</p>
        <div className="password-container">
          <p className="password-text">{showPassword ? password : '******'}</p>
          <button onClick={handleCopy} className="copy-btn">Copy</button>
          <button onClick={deletePasswordRecord.bind(null, id)} className="view-btn">
            {showPassword ? 'Hide' : 'View'}
          </button>
        </div>
      </div>
      <button onClick={() => deletePasswordRecord(id)} className="delete-btn">Delete</button>
    </li>
  );
};

export default PasswordItem;

