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

import Cookies from "js-cookie";

const Page = () => {
  const { t } = useTranslation();
  const [radioValue, setRadioValue] = useState("1"); // Appearance: Light or Dark
  const [selectedImage, setSelectedImage] = useState(null);
  const [profileImageFileError, setProfileImageFileError] = useState(null);
  const [pending, setPending] = useState(false);
  const [roles, setRoles] = useState([]);
  const [eyeToggle, setToggle] = useState(false);
  const router = useRouter(); // Initialize useRouter for redirection

  useEffect(() => {
    const lang = Cookies.get("i18next");
    const fetchRoles = async () => {
      try {
        setPending(true);

        const response = await GET(`${BASE_URL}/api/admin/role`, {
          lang: lang,
        });
        if (response?.data?.status === true) {
          setRoles(response?.data?.data || []);
        } else {
          toast.error(t("settings.users.create.form_error"));
        }
      } catch (error) {
        toast.error(t("settings.users.create.form_error"));
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
    const formData = new FormData();
    formData.append("language_id", data.language_id || "1"); // Optional
    formData.append("name", data?.name);
    formData.append("email", data?.email);
    formData.append("role_id", data?.role_id);
    formData.append("status", data?.status === "Active" ? 1 : 0);
    formData.append("appearance", radioValue);
    formData.append("profile_image", data?.profile_image[0] || "");
    formData.append("password", data?.password);
    formData.append("lang", Cookies.get("i18next"));

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
        toast.success(response.data?.message);
        router.push("/settings");
      } else {
        setPending(false);
      }
    } catch (error) {
      setPending(false);
      toast.error(t("settings.users.create.form_error"));
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
          <h2>{t("settings.settings")}</h2>
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
                                t(
                                  "settings.users.create.profile_image_size_exceeded"
                                )
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
                          <Form.Label>
                            {t("settings.users.create.name")}
                          </Form.Label>
                          <Form.Control
                            {...register("name", {
                              required: t(
                                "settings.users.create.name_required"
                              ),
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
                          <Form.Label>
                            {t("settings.users.create.email")}
                          </Form.Label>
                          <Form.Control
                            {...register("email", {
                              required: t(
                                "settings.users.create.email_required"
                              ),
                              pattern: {
                                value:
                                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: t(
                                  "settings.users.create.email_invalid"
                                ),
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
                          <Form.Label>
                            {t("settings.users.create.user_type")}
                          </Form.Label>
                          <Form.Select
                            {...register("role_id", {
                              required: t(
                                "settings.users.create.user_type_required"
                              ),
                            })}
                          >
                            <option value=''>
                              {t("user_type.select_user_type")}
                            </option>
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
                          <Form.Label>
                            {t("settings.users.create.status")}
                          </Form.Label>
                          <Form.Select
                            {...register("status", {
                              required: t(
                                "settings.users.create.status_required"
                              ),
                            })}
                          >
                            <option value='Active'>
                              {t("dugnader.active")}
                            </option>
                            <option value='Inactive'>
                              {t("dugnader.inactive")}
                            </option>
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
                        <Form.Group className='mb-3 position-relative'>
                          <Form.Label>
                            {t("settings.users.create.password")}
                          </Form.Label>
                          <Form.Control
                            className=''
                            type={!eyeToggle ? "password" : "text"}
                            {...register("password", {
                              required: t(
                                "settings.users.create.password_required"
                              ),
                              minLength: {
                                value: 8,
                                message: t(
                                  "settings.users.create.password_min_length"
                                ),
                              },
                            })}
                          />
                          <img
                            src={
                              !eyeToggle
                                ? "/images/hide.svg"
                                : "/images/showEye.svg"
                            }
                            className='img-fluid eye-icon user-crert'
                            onClick={() => setToggle(!eyeToggle)}
                          />
                          {errors.password && (
                            <span className='text-danger'>
                              {errors.password.message}
                            </span>
                          )}
                        </Form.Group>
                      </div>
                    </div>
                    <div className='row mt-3 mb-5'>
                      <div className='col-md-6'>
                        <button
                          className='createorder_top_right btn_bg_save w-100'
                          type='submit'
                        >
                          {t("settings.users.create.save")}
                        </button>
                      </div>
                      <div className='col-md-6'>
                        <button
                          className='createorder_top_right can-btn w-100'
                          style={{ border: "none" }}
                          onClick={() =>
                            (window.location.href = `/settings?type=seller`)
                          }
                        >
                          {t("settings.users.create.cancel")}
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
