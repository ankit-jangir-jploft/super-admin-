// components/SkeletonLoader.js
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonLoader = () => {
  return (
    <>
      <div className='admin-header'>
        <h2>
          <Skeleton width={100} height={40} style={{ textAlign: "center", paddingTop: "20px" }} />
        </h2>
        <div className='search-frm' style={{ textAlign: "center", padding: "10px 20px" }}>
          <Skeleton width={30} height={30} />
          <Skeleton width={350} height={30} />
          <Skeleton width={30} height={30} />
          <Skeleton circle={true} height={41} width={41} />
        </div>
      </div>
      <div className='shdw-crd'>
        <div className='table-responsive order-table'>
          <table>
            <thead>
              <tr>
                <th><Skeleton width={30} height={30} /></th>
                <th><Skeleton width={70} height={30} /></th>
                <th><Skeleton width={120} height={30} /></th>
                <th><Skeleton width={100} height={30} /></th>
                <th><Skeleton width={100} height={30} style={{ borderRadius: "20px" }} /></th>
                <th><Skeleton width={120} height={30} /></th>
                <th><Skeleton width={30} height={30} /></th>
                <th><Skeleton width={50} height={30} /></th>
                <th><Skeleton width={150} height={30} /></th>
                <th><Skeleton width={200} height={30} /></th>
                <th><Skeleton width={50} height={30} /></th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 10 }).map((_, index) => (
                <tr key={index}>
                  <td><Skeleton width={30} height={30} /></td>
                  <td><Skeleton width={70} height={30} /></td>
                  <td><Skeleton width={120} height={30} /></td>
                  <td><Skeleton width={100} height={30} /></td>
                  <td><Skeleton width={100} height={30} style={{ borderRadius: "20px" }} /></td>
                  <td><Skeleton width={120} height={30} /></td>
                  <td><Skeleton width={30} height={30} /></td>
                  <td><Skeleton width={50} height={30} /></td>
                  <td>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <Skeleton width={30} height={30} />
                      <Skeleton width={30} height={30} />
                      <Skeleton width={30} height={30} />
                      <Skeleton width={30} height={30} />
                    </div>
                  </td>
                  <td><Skeleton width={200} height={20} /></td>
                  <td><Skeleton width={30} height={30} /></td>
                </tr>
              ))}
              <tr>
                <td colSpan='12' style={{ textAlign: "center", padding: "20px" }}>
                  <Skeleton width={200} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className='tablebruk'>
        <div className='tablebruk_left'>
          <Skeleton width={200} height={40} style={{ borderRadius: "30px" }}/>
        </div>
        <div style={styles.paginationContainer}>
        <Skeleton width={200} height={20} style={{ marginRight: '8px' }} />
        <Skeleton width={40} height={40} style={{ marginRight: '-2px', borderRadius:"50%" }} />
        <Skeleton width={40} height={40} style={{ marginRight: '8px', borderRadius:"50%"  }} />
        <Skeleton width={70} height={20} style={{ marginRight: '8px' }} />
        <Skeleton width={40} height={40} style={{ marginRight: '-2px' , borderRadius:"50%" }} />
        <Skeleton width={40} height={40} style={{ marginRight: '0px' , borderRadius:"50%" }} />
      </div>
      </div>
      {/* Pagination Skeleton */}
      
    </>
  );
};

const styles = {
  paginationContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontFamily: "Arial, sans-serif",
    fontSize: "14px",
    justifyContent: "end",
    width: "100%",
  },
};

export default SkeletonLoader;