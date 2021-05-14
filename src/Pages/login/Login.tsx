import React, { FormEvent, useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import WrapperContent from '../../Components/wrappercontent';
import LogoContainer from '../../Components/LogoContainer';
import Input from '../../Components/Input';
import purpleHeartIcon from '../../Assets/icons/purple-heart.svg';
import { AuthContext } from '../../contexts/auth';
import './styles.scss';
import FlashMessage from '../../Components/PopUpMessage';

function Login() {
  const { signIn, emitMessage } = useContext(AuthContext);
  const history = useHistory();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('error');

  async function handleSignIn(e: FormEvent) {
    e.preventDefault();
    if (isAble()) {
      await signIn({ email, password })
        .then((res) => {
          history.push('/');
          emitMessage('Logado com sucesso');
        })
        .catch((res) => {});
    }
  }

  function isAble() {
    return email !== '' && password !== '';
  }

  return (
    <div id="page-login">
      <WrapperContent className="page-content-right" linkColor={false}>
        <LogoContainer />
        <div className="login-container">
          <form className="form-80" onSubmit={(e) => handleSignIn(e)}>
            {' '}
            {/*(e) => handleSignIn(e)*/}
            <fieldset>
              <legend>
                <p>Fazer login</p>
                <Link to="/signup">Criar uma conta</Link>
              </legend>
              <Input
                name="email"
                placeholder="E-mail"
                // stacked={true}
                value={String(email)}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <Input
                name="password"
                type="password"
                placeholder="Senha"
                // stacked={true}
                value={String(password)}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <div className="login-tools">
                <div />
                <Link to="/forgot-password">Esqueci minha senha</Link>
              </div>
              <button
                className={`login-submit ${isAble() && 'login-submit-active'}`}
                disabled={!isAble()}
                type="submit"
              >
                Entrar
              </button>
            </fieldset>
            <div className="login-footer">
              <div className="signup">
                <p>Não tem conta?</p>
                <Link to="/signup">Registe-se</Link>
              </div>
              <span>
                É de graça <img src={purpleHeartIcon} alt="Coração roxo" />
              </span>
            </div>
          </form>
        </div>
      </WrapperContent>
      {success ? <FlashMessage message={message} type={type} /> : ''}
    </div>
  );
}

export default Login;
