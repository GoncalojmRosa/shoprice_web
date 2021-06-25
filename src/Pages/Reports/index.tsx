import './style.css';
import React, { useContext, useEffect, useState } from 'react';
import { addClass } from '@syncfusion/ej2-base';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-kanban';
import { deleteReport, getReports, Reports, updateReport } from '../../services/auth';
import TopBarContainer from '../../Components/TopBarContainer';
import { AuthContext } from '../../contexts/auth';

export default function TestRandom() {
  const { emitMessage } = useContext(AuthContext);
  const [reports, setReports] = useState<Reports[]>([]);

  useEffect(() => {
    getReports().then((report) => {
      setReports(report.data);
      console.log(report);
    });
  }, []);

  function cardRendered(args: any) {
    let val = args.data.Priority;
    addClass([args.element], val);
    console.log(args.data);
  }
  function columnTemplate(props: any) {
    return (
      <div className="header-template-wrap">
        <div className={'header-icon e-icons ' + props.keyField}></div>
        <div className="header-text">{props.headerText}</div>
      </div>
    );
  }

  function HandleCard(s: any) {
    if (s.requestType === 'cardChanged') {
      updateReport({ Reports: s.changedRecords }).then((rep) => {
        console.log(rep);
        emitMessage('Report Editado com Sucesso');
      });
    } else if (s.requestType === 'cardRemoved') {
      // console.log(s);
      deleteReport(s.deletedRecords[0]).then((rep) => {
        console.log(rep);
        emitMessage('Report Eliminado com Sucesso');
      });
    }
  }

  return (
    <div>
      <TopBarContainer profile={true} />

      {/* <div className="schedule-control-section">
        <div className="col-lg-12 control-section">
          <div className="control-wrapper"> */}
      <KanbanComponent
        style={{ background: 'none' }}
        id="kanban"
        cssClass="kanban-overview"
        keyField="Status"
        dataSource={reports}
        enableTooltip={true}
        swimlaneSettings={{ keyField: 'Priority' }}
        cardSettings={{
          headerField: 'Title',
          contentField: 'Summary',
          tagsField: 'Tags',
          selectionType: 'Multiple',
        }}
        // dragStop={HandleDragUpdateReport}
        cardRendered={cardRendered.bind(reports)}
        actionComplete={HandleCard}
        dialogSettings={{
          fields: [
            { text: 'ID', key: 'Title', type: 'TextBox' },
            { key: 'Status', type: 'DropDown' },
            { key: 'Tags', type: 'TextBox' },
            { key: 'Priority', type: 'DropDown' },
            { key: 'Summary', type: 'TextArea' },
          ],
        }}
      >
        <ColumnsDirective>
          <ColumnDirective
            headerText="To Do"
            keyField="Open"
            template={columnTemplate.bind(reports)}
          />
          <ColumnDirective
            headerText="In Progress"
            keyField="InProgress"
            template={columnTemplate.bind(reports)}
          />
          <ColumnDirective
            headerText="In Review"
            keyField="Review"
            template={columnTemplate.bind(reports)}
          />
          <ColumnDirective
            headerText="Done"
            keyField="Close"
            template={columnTemplate.bind(reports)}
          />
        </ColumnsDirective>
      </KanbanComponent>
    </div>
    //     </div>
    //   </div>
    // </div>
  );
}
