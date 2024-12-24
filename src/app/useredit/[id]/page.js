"use client";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import { useParams, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { GET, POST } from "../../Utils/apiFunctions";
import { BASE_URL } from "../../Utils/apiHelper";
import Image from "next/image";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";

const Page = ({param}) => {
  const [radioValue, setRadioValue] = useState("1");
  const [profileImage, setProfileImage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [fetchSellerById, setFetchSellerById] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // const { sellerId } = useSearchParams();

  const params = useParams()

  const radios = [
    { name: "Light", value: "1" },
    { name: "Dark", value: "2" },
  ];

  const fetchSellerList = async () => {
    try {
      const response = await GET(
        `${BASE_URL}/api/admin/sellerList?id=${params?.id}`
      );
      if (response?.data?.data?.[0]) {
        const seller = response.data.data[0];
        setFetchSellerById(seller);

        // Update form state with fetched data
        setValue("name", seller.name || "");
        setValue("email", seller.email || "");
        setValue("userType", seller.role_id === 2 ? "Seller" : "Unknown");
        setValue("status", seller.status === 1 ? "Active" : "Inactive");
        setValue("language", seller.language_id === 1 ? "English" : "Hindi");
        setProfileImage(seller?.profile_image || "");
      }
    } catch (error) {
      toast.error("Failed to fetch seller details.");
    }
  };

  useEffect(() => {
    if (params?.id) {
      fetchSellerList();
    }
  }, [params]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("role_id", data.userType === "seller" ? 2 : 1);
      formData.append("status", data.status === "Active" ? 1 : 0);
      formData.append("language_id", data.language === "English" ? 1 : 1);
      formData.append("appearance", radioValue);
      formData.append("profile_image", selectedImage);

      const response = await POST(
        `${BASE_URL}/api/admin/sellerUpdate?id=${sellerId}`,
        formData
      );

      if (response?.status === 200) {
        toast.success("Seller updated successfully!");
        fetchSellerList();
      } else {
        toast.error("Failed to update seller.");
      }
    } catch (error) {
      toast.error("An error occurred while updating the seller.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <Sidebar />
      <div className='detail-admin-main stng-pge'>
        <div className='admin-header'>
          <h2>Settings</h2>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <div className='shdw-crd crte-ordr edte-usr'>
              <div className='row'>
                <div className='col-md-7 mx-auto'>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='d-block text-center'>
                      <Image
                        width={100}
                        height={100}
                        className='d-inline-block rounded-circle'
                        src={profileImage || "/images/usr-edt.png"}
                        alt='Profile'
                      />
                      <Form.Control
                        type='file'
                        accept='image/*'
                        onChange={handleImageChange}
                      />
                    </div>
                    <div className='row'>
                      <div className='col-md-6'>
                        <Form.Group className='mb-3'>
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            {...register("name", {
                              required: "Name is required",
                            })}
                            placeholder='Name'
                          />
                          {errors.name && (
                            <p className='text-danger'>{errors.name.message}</p>
                          )}
                        </Form.Group>
                      </div>
                      <div className='col-md-6'>
                        <Form.Group className='mb-3'>
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            {...register("email", {
                              required: "Email is required",
                              pattern: {
                                value:
                                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: "Invalid email address",
                              },
                            })}
                            placeholder='Email'
                          />
                          {errors.email && (
                            <p className='text-danger'>
                              {errors.email.message}
                            </p>
                          )}
                        </Form.Group>
                      </div>
                      <div className='col-md-6'>
                        <Form.Group className='mb-3'>
                          <Form.Label>User Type</Form.Label>
                          <Form.Select
                            {...register("userType")}
                            defaultValue='Seller'
                          >
                            <option value='Seller'>Seller</option>
                            <option value='Unknown'>Unknown</option>
                          </Form.Select>
                        </Form.Group>
                      </div>
                      <div className='col-md-6'>
                        <Form.Group className='mb-3'>
                          <Form.Label>Status</Form.Label>
                          <Form.Select
                            {...register("status")}
                            defaultValue='Active'
                          >
                            <option value='Active'>Active</option>
                            <option value='Inactive'>Inactive</option>
                          </Form.Select>
                        </Form.Group>
                      </div>
                      <div className='col-md-6'>
                        <Form.Group className='mb-3'>
                          <Form.Label>Language</Form.Label>
                          <Form.Select
                            {...register("language")}
                            defaultValue='1'
                          >
                            <option value='English'>English</option>
                            <option value='Hindi'>Hindi</option>
                          </Form.Select>
                        </Form.Group>
                      </div>
                      <div className='col-md-6'>
                        <Form.Group className='mb-3'>
                          <div className='swtch-bt'>
                            <Form.Label>Appearance</Form.Label>
                            <ButtonGroup>
                              {radios.map((radio, idx) => (
                                <ToggleButton
                                  key={idx}
                                  id={`radio-${idx}`}
                                  type='radio'
                                  variant={
                                    idx % 2
                                      ? "outline-success"
                                      : "outline-danger"
                                  }
                                  name='radio'
                                  value={radio.value}
                                  checked={radioValue === radio.value}
                                  onChange={(e) =>
                                    setRadioValue(e.currentTarget.value)
                                  }
                                >
                                  {radio.name}
                                </ToggleButton>
                              ))}
                            </ButtonGroup>
                          </div>
                        </Form.Group>
                      </div>
                    </div>
                    <div className='row mt-3 mb-5'>
                      <div className='col-md-6'>
                        <button
                          type='submit'
                          className='btn btn-primary w-25'
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;

// import React from "react";

// function page() {
//   return <div></div>;
// }

// export default page;
