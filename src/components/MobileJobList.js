import React, {useRef} from 'react';
import JobCard from "./JobCard";
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";


const MobileJobList = ({jobs}) => {

  const cache = useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100,
    })
  );

  return (
    <div style={{width: "100%", height: "120vh"}}>
      <AutoSizer>
        {({width, height}) => (
          <List
            width={width}
            height={height}
            rowHeight={cache.current.rowHeight}
            deferredMeasurementCache={cache.current}
            rowCount={jobs.length}
            rowRenderer={({key, index, style, parent}) => {
              const job = jobs[index];

              return (
                <CellMeasurer
                  key={key}
                  cache={cache.current}
                  parent={parent}
                  columnIndex={0}
                  rowIndex={index}
                >
                  <div style={style}>
                    <JobCard job={job} key={index}/>
                  </div>
                </CellMeasurer>
              );
            }}
          />
        )}
      </AutoSizer>
    </div>
  )
}

export default MobileJobList;
