import React, { useState } from 'react';
import Input from '../../Components/Input';
import PageHeader from '../../Components/PageHeader';
import Select from '../../Components/Select';

//IMG
import warningIcon from '../../Assets/warning.svg';
import ModalComponent from '../../Components/Modal/index';
import ProductItem from '../../Components/ProductItem';

//CSS
import './styles.css';
import TopBarContainer from '../../Components/TopBarContainer';

export default function ItemsForm() {
  const [isModalOpen, setModalState] = useState(false);

  const toggleModal = () => setModalState(!isModalOpen);

  const [scheduleItems, setScheduleItems] = useState([
    {
      week_day: 0,
      from: '',
      to: '',
    },
  ]);

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      {
        week_day: 0,
        from: '',
        to: '',
      },
    ]);
  }

  function setScheduleItemValue(position: number, field: string, value: string) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return {
          ...scheduleItem,
          [field]: value,
        };
      }

      return scheduleItem;
    });

    setScheduleItems(updatedScheduleItems);
  }

  return (
    <div id="page-teacher-form" className="container">
      {/* <TopBarContainer */}
      <PageHeader
        page={'Comparar'}
        title={'Ainda bem que você decidiu poupar dinheiro'}
        description={'O primeiro passo é criar a sua lista de compras'}
      ></PageHeader>

      <form>
        <main>
          <fieldset>
            <legend>
              Os seus produtos
              <button type="button" onClick={addNewScheduleItem}>
                + Novo Produto
              </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => {
              return (
                <div key={scheduleItem.week_day} className="schedule-item">
                  <Input
                    name="produtct_name"
                    label="Nome do Produto"
                    type="text"
                    value={scheduleItem.from}
                    onChange={(e) => {
                      setScheduleItemValue(index, 'from', e.target.value);
                    }}
                  />
                  <Select
                    name="week_day"
                    label="Quantidade"
                    value={scheduleItem.week_day}
                    options={[
                      {
                        value: '0',
                        label: 'Selecione uma Opção',
                        disable: true,
                      },
                      { value: '1', label: '1 Unidade' },
                      { value: '2', label: '2 Unidades' },
                      { value: '3', label: '3 Unidades' },
                      { value: '4', label: '4 Unidades' },
                      { value: '5', label: '5 Unidades' },
                      { value: '6', label: '6 Unidades' },
                      { value: '7', label: '7 Unidades' },
                      { value: '8', label: '8 Unidades' },
                      { value: '9', label: '9 Unidades' },
                      { value: '10', label: '10 Unidades' },
                    ]}
                    onChange={(e) => {
                      setScheduleItemValue(index, 'week_day', e.target.value);
                    }}
                  />
                  <div className="market-button">
                    <button type="button" onClick={toggleModal}>
                      + Ver Preço
                    </button>
                  </div>
                </div>
              );
            })}
            <ModalComponent
              title={'Lojas Online Disponíveis'}
              isOpen={isModalOpen}
              onClose={toggleModal}
            >
              <div className="product-item">
                <ProductItem name={'Continente'} price={'2.20'} photo={'a'} />
                <ProductItem name={'Continente'} price={'2.20'} photo={'a'} />
                <ProductItem name={'Continente'} price={'2.20'} photo={'a'} />
                <ProductItem name={'Continente'} price={'2.20'} photo={'a'} />
                <ProductItem name={'Continente'} price={'2.20'} photo={'a'} />
                <ProductItem name={'Continente'} price={'2.20'} photo={'a'} />
              </div>
            </ModalComponent>
          </fieldset>
          <footer>
            <p>
              <img src={warningIcon} alt="Aviso Importante" />
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type="submit">Guardar Lista</button>
          </footer>
        </main>
      </form>
    </div>
  );
}
