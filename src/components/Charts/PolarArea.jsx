import React from 'react'

const PolarArea = ({labels = [], data = null, backgroundColor = [], height = 200, width = 200 }) => {

    
    return (
        <div>
           <PolarArea 
            data={{
                labels: labels,
                datasets:[
                    {
                        label: labels,
                        data: data,
                        backgroundColor: backgroundColor
                    }
                ]
            }}
            height={height}
            width={width}
            options={{ maintainAspectRatio: false }}
           /> 
        </div>
    )
}

export default PolarArea