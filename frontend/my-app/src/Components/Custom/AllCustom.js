import React,{useEffect} from 'react'
import CustomContainer from './CustomContainer';
import AddButton from '../Shared/AddButton'

export default function AllCustom({ setUrl }) {
    useEffect(() => {
        setUrl("Custom");
    }, []);
    return (
        <div className="ml-16.625">
            <h2 className={`text-white text-2xl font-medium`}>Custom</h2>
            <p className=" text-unclicked">All the current customs</p>
            <div className="grid grid-flow-row grid-cols-4 gap-8 mt-4">
                <CustomContainer
                    name="Custom1"
                    description="Custom 1 description..."
                    remainingdays={2}
                    chart={12.4}
                />
                <CustomContainer
                    name="Custom1"
                    description="Custom 1 description..."
                    remainingdays={0}
                    chart={12.4}
                />
                <CustomContainer
                    name="Custom1"
                    description="Custom 1 description..."
                    remainingdays={30}
                    chart={-12.4}
                />
                <CustomContainer
                    name="Custom1"
                    description="Custom 1 description..."
                    remainingdays={1}
                    chart={12.4}
                />
                <CustomContainer
                    name="Custom1"
                    description="Custom 1 description..."
                    remainingdays={0}
                    chart={-12.4}
                />
                <CustomContainer
                    name="Custom1"
                    description="Custom 1 description..."
                    remainingdays={23}
                    chart={12.4}
                />
                <CustomContainer
                    name="Custom1"
                    description="Custom 1 description..."
                    remainingdays={123}
                    chart={12.4}
                />
                <AddButton 
                    title="custom"
                />
            </div>
        </div>
    )
}
