'use client'

import { Oval } from 'react-loader-spinner'

const TableLoading = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px', border: '1px solid #dadada', borderRadius: '8px' }}>
      <Oval
        visible={true}
        height="30"
        width="30"
        color="#0d6efd"
        secondaryColor="#3498db"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
      <span style={{ marginLeft: 10, fontWeight: 'bold' }}>Загрузка данных...</span>
    </div>
  )
}

export default TableLoading