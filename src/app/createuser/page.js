"use client";
import Sidebar from "../Components/Sidebar/Sidebar";
import Form from "react-bootstrap/Form";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { GET, POST } from "../Utils/apiFunctions";
import { BASE_URL } from "../Utils/apiHelper";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation"; // Use useRouter for client-side navigation
import Loader from "../Components/Loader/Loader";
import { useTranslation } from "react-i18next";

const Page = () => {
  const { t } = useTranslation();
  const [radioValue, setRadioValue] = useState("1"); // Appearance: Light or Dark
  const [selectedImage, setSelectedImage] = useState(null);
  const [profileImageFileError, setProfileImageFileError] = useState(null);
  const [pending, setPending] = useState(false);
  const [roles, setRoles] = useState([]);
  const router = useRouter(); // Initialize useRouter for redirection

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setPending(true);
        const response = await GET(`${BASE_URL}/api/admin/role`);
        if (response?.data?.status === true) {
          setRoles(response?.data?.data || []);
        } else {
          toast.error("Error submitting form.");
        }
      } catch (error) {
        toast.error("Error submitting form.");
        console.error(error);
      } finally {
        setPending(false);
      }
    };

    fetchRoles();
  }, []);

  const radios = [
    { name: t("settings.users.create.light"), value: "1" },
    { name: t("settings.users.create.dark"), value: "2" },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // Check for image selection
    if (!selectedImage) {
      setProfileImageFileError("Profile image is required.");
      return; // Prevent form submission if image is not selected
    } else {
      setProfileImageFileError(null);
    }

    const formData = new FormData();
    formData.append("language_id", data.language_id || "1"); // Optional
    formData.append("name", data?.name);
    formData.append("email", data?.email);
    formData.append("role_id", data?.role_id);
    formData.append("status", data?.status);
    formData.append("appearance", radioValue);
    formData.append("profile_image", data?.profile_image[0]);

    try {
      setPending(true);
      const response = await POST(
        `${BASE_URL}/api/admin/sellerCreate`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response?.data?.status === true) {
        setPending(false);
        toast.success("Form submitted successfully!");
        router.push("/settings");
      } else {
        setPending(false);
      }
    } catch (error) {
      setPending(false);
      toast.error("Error submitting form.");
      console.error(error);
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      <Sidebar />
      <Loader visible={pending} />
      <div className='detail-admin-main stng-pge'>
        <div className='admin-header'>
          {/* <h2>Settings</h2> */}
          <h2>{t("settings.settings")}</h2>
          <div className='search-frm'>
            <input type='text' />
            {/* <img
              className='input-right-icon'
              src='/images/search-interface.svg'
            /> */}
            <Link href={""}>
              <img src='/images/notifications_none.svg' />
            </Link>
            <Link href={"/"}>
              <img src='/images/avatar-style.png' />
            </Link>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-12'>
            <div className='shdw-crd crte-ordr edte-usr'>
              <div className='row'>
                <div className='col-md-7 mx-auto'>
                  <div className='d-block text-center profile_img'>
                    <img
                      className='d-inline-block w-25 h-25'
                      style={{ borderRadius: "100%" }}
                      src={selectedImage || "/images/user.png"}
                    />
                    {/* <h2 className='my-4 color_red'>Add Photo</h2> */}
                    <h2 className='my-4 color_red'>
                      {t("settings.users.create.add_photo")}
                    </h2>
                    <Form.Group className='UploadPhoto_file'>
                      <Form.Control
                        className='UploadPhoto'
                        type='file'
                        {...register("profile_image")}
                        accept='image/*'
                        onChange={(e) => {
                          const theFile = e.target.files[0];

                          if (theFile) {
                            const maxSize = 2 * 1024 * 1024;

                            if (theFile.size > maxSize) {
                              toast.error(
                                "File size is too large. Maximum allowed size is 2MB."
                              );
                              setSelectedImage(null);
                              e.target.value = "";
                              return;
                            }

                            setSelectedImage(URL.createObjectURL(theFile));
                            setProfileImageFileError(null);
                          }
                        }}
                      />
                      {profileImageFileError && (
                        <p className='text-danger'>{profileImageFileError}</p>
                      )}
                    </Form.Group>
                  </div>

                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <div className='row'>
                      <div className='col-md-6'>
                        <Form.Group className='mb-3'>
                          {/* <Form.Label>Name</Form.Label> */}
                          <Form.Label>
                            {t("settings.users.create.name")}
                          </Form.Label>
                          <Form.Control
                            // placeholder="Elise Nordmann"
                            {...register("name", {
                              required: "Name is required",
                            })}
                          />
                          {errors.name && (
                            <span className='text-danger'>
                              {errors.name.message}
                            </span>
                          )}
                        </Form.Group>
                      </div>
                      <div className='col-md-6'>
                        <Form.Group className='mb-3'>
                          {/* <Form.Label>Email</Form.Label> */}
                          <Form.Label>
                            {t("settings.users.create.email")}
                          </Form.Label>
                          <Form.Control
                            // placeholder="elise.nordmann@dugnadstid.no"
                            {...register("email", {
                              required: "Email is required",
                              pattern: {
                                value:
                                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Invalid email format",
                              },
                            })}
                          />
                          {errors.email && (
                            <span className='text-danger'>
                              {errors.email.message}
                            </span>
                          )}
                        </Form.Group>
                      </div>
                      <div className='col-md-6'>
                        <Form.Group className='mb-3'>
                          {/* <Form.Label>User Type</Form.Label> */}
                          <Form.Label>
                            {t("settings.users.create.user_type")}
                          </Form.Label>
                          <Form.Select
                            {...register("role_id", {
                              required: "User type is required",
                            })}
                          >
                            <option value=''>Select User Type</option>
                            {roles?.map((role) => {
                              return (
                                <option value={role.id}>{role.name}</option>
                              );
                            })}
                          </Form.Select>
                          {errors.role_id && (
                            <span className='text-danger'>
                              {errors.role_id.message}
                            </span>
                          )}
                        </Form.Group>
                      </div>
                      <div className='col-md-6'>
                        <Form.Group className='mb-3'>
                          {/* <Form.Label>Status</Form.Label> */}
                          <Form.Label>
                            {t("settings.users.create.status")}
                          </Form.Label>
                          <Form.Select
                            {...register("status", {
                              required: "Status is required",
                            })}
                          >
                            <option value='1'>Active</option>
                            <option value='2'>Inactive</option>
                          </Form.Select>
                          {errors.status && (
                            <span className='text-danger'>
                              {errors.status.message}
                            </span>
                          )}
                        </Form.Group>
                      </div>
                      <div className='col-md-6'>
                        <Form.Group className='mb-3'>
                          {/* <Form.Label>Language</Form.Label> */}
                          <Form.Label>
                            {t("settings.users.create.language")}
                          </Form.Label>
                          <Form.Select {...register("language_id")}>
                            <option value={1}>Norwegian</option>
                            <option value={2}>English</option>
                          </Form.Select>
                        </Form.Group>
                      </div>
                      <div className='col-md-6'>
                        <div className='swtch-bt'>
                          {/* <Form.Label>Appearance</Form.Label> */}
                          <Form.Label>
                            {t("settings.users.create.appearance")}
                          </Form.Label>
                          <ButtonGroup>
                            {radios.map((radio, idx) => (
                              <ToggleButton
                                key={idx}
                                id={`radio-${idx}`}
                                type='radio'
                                variant={
                                  idx % 2 ? "outline-success" : "outline-danger"
                                }
                                name='appearance'
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
                      </div>
                    </div>
                    <div className='row mt-3 mb-5'>
                      {/* <div className="col-md-6">
                                                <button
                                                    className="createorder_top_right w-100 btn_bg_delt"
                                                    type="submit"
                                                >
                                                    Delete user
                                                </button>
                                            </div> */}
                      <div className='col-md-6'>
                        <button
                          className='createorder_top_right btn_bg_save w-100'
                          type='submit'
                        >
                          {/* Save */}
                          {t("settings.users.create.save")}
                        </button>
                      </div>
                    </div>
                  </Form>
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
