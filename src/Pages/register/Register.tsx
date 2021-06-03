import React, { FormEvent, useContext, useState } from 'react';
import Input from '../../Components/Input';
import WrapperContent from '../../Components/wrappercontent';
import LogoContainer from '../../Components/LogoContainer';
import './styles.scss';
// import { useHistory } from 'react-router-dom';
import PopUpMessage from '../../Components/PopUpMessage';
import { AuthContext } from '../../contexts/auth';

function SignUp() {
  const { register } = useContext(AuthContext);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');

  async function handleCreateUser(e: FormEvent) {
    e.preventDefault();
    if (isAble()) {
      await register({ name, email, password })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          setMessage(err.response.data.error);
          setSuccess(true);
          setType('Error');
        });
    }
  }

  function isAble() {
    return name !== '' && email !== '' && password !== '';
  }

  return (
    <div id="page-signup">
      <WrapperContent className="page-content-left" linkColor={true} logoColor={false}>
        <LogoContainer />
        <div className="signup-container">
          <form className="form-80" onSubmit={(event) => handleCreateUser(event)}>
            <fieldset>
              <legend>
                <p>SignUp</p>
              </legend>
              <span>Preencha os dados abaixo para começar.</span>
              <Input
                name="name"
                placeholder="Nome"
                value={String(name)}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <Input
                name="email"
                placeholder="E-mail"
                value={String(email)}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <Input
                name="password"
                placeholder="Password"
                type="password"
                value={String(password)}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button
                className={`login-submit ${isAble() && 'login-submit-active'}`}
                disabled={!isAble()}
                type="submit"
              >
                Concluir Registo
              </button>
            </fieldset>
          </form>
        </div>
      </WrapperContent>
      {success ? <PopUpMessage message={message} type={type} /> : ''}
    </div>
  );
}

export default SignUp;
