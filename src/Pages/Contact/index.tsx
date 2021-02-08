import React, { useState } from 'react';
import Input from '../../Components/Input';
import PageHeader from '../../Components/PageHeader';
import Select from '../../Components/Select';

//IMG
import warningIcon from '../../Assets/warning.svg';

//CSS
import './styles.css';

export default function Contact() {
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
    <div>
      <div id="page-teacher-form" className="container">
        <PageHeader
          page="Contactar"
          title="Que incrivel que você quer dar aulas"
          description="O primeiro passo é preencher esse formulário de inscrição"
        />

        <main>
          <form>
            <fieldset>
              <legend>Seus Dados</legend>
              <Input
                name="name"
                label="Nome Completo"
                // value={name}
                // onChange={(e) => {
                //   setName(e.target.value);
                // }}
              />
              <Input
                name="avatar"
                label="Avatar"
                // value={avatar}
                // onChange={(e) => {
                //   setAvatar(e.target.value);
                // }}
              />
              <Input
                name="whatsapp"
                label="Whatsapp"
                // value={whatsapp}
                // onChange={(e) => {
                //   setWhatsapp(e.target.value);
                // }}
              />
              {/* <Textarea
                name="bio"
                label="Biografia"
                value={bio}
                onChange={(e) => {
                  setBio(e.target.value);
                }}
              /> */}
            </fieldset>
            <fieldset>
              <legend>Sobre a aula</legend>
              <Select
                name="subject"
                label="Matéria"
                // value={subject}
                // onChange={(e) => {
                //   setSubject(e.target.value);
                // }}
                options={[
                  { value: 'Artes', label: 'Artes' },
                  { value: 'Biologia', label: 'Biologia' },
                  { value: 'Ciências', label: 'Ciências' },
                  { value: 'Educação Física', label: 'Educação-Fisica' },
                  { value: 'Física', label: 'Física' },
                  { value: 'Geografia', label: 'Geografia' },
                  { value: 'História', label: 'História' },
                  { value: 'Português', label: 'Português' },
                  { value: 'Matemática', label: 'Matemática' },
                ]}
              />
              <Input
                name="cost"
                label="Custo da sua hora por aula"
                // value={cost}
                // onChange={(e) => {
                //   setCost(e.target.value);
                // }}
              />
            </fieldset>
            <fieldset>
              <legend>
                Horário disponíveis
                <button type="button" onClick={addNewScheduleItem}>
                  + Novo Horário
                </button>
              </legend>

              {scheduleItems.map((scheduleItem, index) => {
                return (
                  <div key={scheduleItem.week_day} className="schedule-item">
                    <Select
                      name="week_day"
                      label="Dia da Semana"
                      value={scheduleItem.week_day}
                      onChange={(e) => {
                        setScheduleItemValue(index, 'week_day', e.target.value);
                      }}
                      options={[
                        { value: '0', label: 'Domingo' },
                        { value: '1', label: 'Segunda-feira' },
                        { value: '2', label: 'Terça-feira' },
                        { value: '3', label: 'Quarta-feira' },
                        { value: '4', label: 'Quinta-feira' },
                        { value: '5', label: 'Sexta-feira' },
                        { value: '6', label: 'Sábado' },
                      ]}
                    />
                    <Input
                      name="from"
                      label="Das"
                      type="time"
                      value={scheduleItem.from}
                      onChange={(e) => {
                        setScheduleItemValue(index, 'from', e.target.value);
                      }}
                    />
                    <Input
                      name="to"
                      label="Até"
                      type="time"
                      value={scheduleItem.to}
                      onChange={(e) => {
                        setScheduleItemValue(index, 'to', e.target.value);
                      }}
                    />
                  </div>
                );
              })}
            </fieldset>

            <footer>
              <p>
                <img src={warningIcon} alt="Aviso Importante" />
                Importante! <br />
                Preencha todos os dados
              </p>
              <button type="submit">Salvar Cadastro</button>
            </footer>
          </form>
        </main>
      </div>
    </div>
  );
}
