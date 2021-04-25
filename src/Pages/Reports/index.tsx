import './style.css';
import React, { useEffect, useState } from 'react';
import { extend, addClass } from '@syncfusion/ej2-base';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-kanban';
import * as dataSource from './dataSource.json';
import { deleteReport, getReports, newReport, Reports, updateReport } from '../../services/auth';

export default function TestRandom() {
  const [reports, setReports] = useState<Reports[]>([]);

  useEffect(() => {
    getReports().then((report) => {
      setReports(report.data);
      // console.log(report);
    });
  }, []);

  function cardRendered(args: any) {
    let val = args.data.Priority;
    addClass([args.element], val);
    // console.log(args.data);
  }
  function columnTemplate(props: any) {
    return (
      <div className="header-template-wrap">
        <div className={'header-icon e-icons ' + props.keyField}></div>
        <div className="header-text">{props.headerText}</div>
      </div>
    );
  }

  function test(s: any) {
    if (s.requestType === 'cardChanged') {
      updateReport(s.changedRecords[0]).then((rep) => {
        console.log(rep);
      });
    } else if (s.requestType === 'cardRemoved') {
      deleteReport({ id: 1 }).then((rep) => {
        console.log(rep);
      });
    }
  }

  return (
    <div className="schedule-control-section">
      <div className="col-lg-12 control-section">
        <div className="control-wrapper">
          <KanbanComponent
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
            actionComplete={test}
            // dialogClose={HandleChangeReport}
            // dialogSettings={ a.fields }
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
      </div>
    </div>
  );
}
