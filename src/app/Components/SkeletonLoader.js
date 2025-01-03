// components/SkeletonLoader.js
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonLoader = () => {
  return (
    <>
      <div className='admin-header'>
        <h3>
          <Skeleton width={50} />
        </h3>
      </div>
      <div className='shdw-crd'>
        <div className='row'>
          <div className='col-md-6'>
            <div className='form-group'>
              <label>
                <Skeleton width={100} />
              </label>
              <Skeleton height={40} />
              <Skeleton height={20} />
            </div>
            <div className='form-group'>
              <label>
                <Skeleton width={100} />
              </label>
              <Skeleton height={40} />
              <Skeleton height={20} />
            </div>
            <div className='form-group'>
              <label>
                <Skeleton width={100} />
              </label>
              <Skeleton height={40} />
              <Skeleton height={20} />
            </div>
          </div>
          <div className='col-md-6'>
            <div className='form-group'>
              <label>
                <Skeleton width={100} />
              </label>
              <Skeleton height={40} />
              <Skeleton height={20} />
            </div>
            <div className='form-group'>
              <label>
                <Skeleton width={100} />
              </label>
              <Skeleton height={40} />
              <Skeleton height={20} />
            </div>
            <div className='form-group'>
              <label>
                <Skeleton width={100} />
              </label>
              <Skeleton height={40} />
              <Skeleton height={20} />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            <div className='form-group'>
              <label>
                <Skeleton width={100} />
              </label>
              <Skeleton height={40} />
              <Skeleton height={20} />
            </div>
            <div className='form-group'>
              <label>
                <Skeleton width={100} />
              </label>
              <Skeleton height={40} />
              <Skeleton height={20} />
            </div>
            <div className='form-group'>
              <label>
                <Skeleton width={100} />
              </label>
              <Skeleton height={40} />
              <Skeleton height={20} />
            </div>
          </div>
          <div className='col-md-6'>
            <div className='form-group'>
              <label>
                <Skeleton width={100} />
              </label>
              <Skeleton height={40} />
              <Skeleton height={20} />
            </div>
            <div className='form-group'>
              <label>
                <Skeleton width={100} />
              </label>
              <Skeleton height={40} />
              <Skeleton height={20} />
            </div>
            <div className='form-group'>
              <label>
                <Skeleton width={100} />
              </label>
              <Skeleton height={40} />
              <Skeleton height={20} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SkeletonLoader;
