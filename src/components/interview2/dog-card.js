import { Col, Row, Space,Collapse } from "antd";
import moment from "moment";
import {FaCheckCircle, FaTimesCircle} from 'react-icons/fa'
const { Panel } = Collapse;
const DogCardInfo = ({ updateDogsInfo, dogInfo }) => {
  return (
    <div className=" rounded flex-row w-96 h-96 bg-gray-200 m-2 justify-between">
      <Row className="border-b-2 border-gray-300 m-2">
        <Col span={6} className=" p-2 mb-2 rounded bg-white">
          <img src={dogInfo.imageUrl} className="rounded"></img>
        </Col>

        <Col span={12} className="flex flex-wrap justify-between mx-2">
          {[
            { label: "Name", value: dogInfo.name },
            { label: "DOB", value: moment(dogInfo.dob).format('L') },
            { label: "Breed", value: dogInfo.breed },
          ].map((item, idx) => {
            return (
                <div key={idx} className="w-30w ">
                  {item.label}
                  <div className="text-blue-600">{item.value}</div>
                </div>
            );
          })}
        </Col>
      </Row>
      <Row className="flex-col">
        {[
            { label: `Neutered/Sprayed: ${dogInfo.requireNeuteredSpayed ? 'Yes' : 'No'} (Required)`, 
            value: dogInfo.requireNeuteredSpayed ? <FaCheckCircle color="green"/> : <FaTimesCircle color="red"/>,
             type:'neut_spray'},
            { label: `${dogInfo.isBanned ? 'Banned' : 'Not Banned'}`, 
             value: !dogInfo.isBanned ? <FaCheckCircle color="green"/> : <FaTimesCircle color="red"/> , 
             type:'isBanned'},
            { label:dogInfo.subscription ? dogInfo.subscription?.membershipName : <>No Subsription {dogInfo.freeGroupId && <span className="underline text-blue-600">(Free Group)</span>} </> ,
             value: (dogInfo.subscription?.status!=='Inactive' || dogInfo.freeGroupId )? <FaCheckCircle color="green"/> : <FaTimesCircle color="red"/>,
              type:'change_subscription' },
            { label: <><span className="mr-2">Pass:</span>{dogInfo.freeGroupId ?  <span className="underline text-blue-600">(Free Group)</span> : dogInfo.subscription?.status==='Active' ? <span>Has Subsription</span> : <span>Missing</span> } </> , 
            value: (dogInfo.subscription?.status!=='Inactive' || dogInfo.freeGroupId )? <FaCheckCircle color="green"/> : <FaTimesCircle color="red"/>
          ,type:'change_pass' },

          ].map((item,idx)=>{
            return(
              <div key={idx} className="flex items-center">
                <span className="mx-2" onClick={()=>{
                  updateDogsInfo({type:item.type,data:item.type==='change_subscription' ? {dogId:dogInfo.id, subInfo: dogInfo.subscription } : {dogId:dogInfo.id}})
                }}>{item.value}</span>
                <span>{item.label}</span>
              </div>
            )
          })
          }
      </Row>
      <Row className="flex start w-full mt-2 justify-center">
      <Space direction="vertical">
    <Collapse expandIconPosition="end" collapsible="header" defaultActiveKey={['1']} className="flex" >
      <Panel  header={<div className="flex items-center"><FaCheckCircle color="green" className="mr-2"/> <span>Vaccinations</span></div>}  key="1" className="w-80">
        {dogInfo.vaccinations.map((vac,idx)=>{
          return <div className="flex  items-center"> 
            <span onClick={()=>{
              updateDogsInfo({type:'change_vaccine', data:{dogId:dogInfo.id,vacId:vac.vaccinationId}})
                        }}
                        >
            {vac.status === 'Verified' ? <FaCheckCircle color="green" className="mr-2"/>
            : <FaTimesCircle color="red" className="mr-2"/>}
            </span>
            <span className="mr-2">{vac.vaccinationName}</span>
            <span className={vac.status==='Verified' ? 'text-green-600' : vac.status==='Missing' ? 'text-blue-600' : "text-red-600" }>({vac.status})</span>
          </div>
        })}
        
      </Panel>
    </Collapse>
    </Space>
      </Row>
    </div>
  );
};
export default DogCardInfo;
