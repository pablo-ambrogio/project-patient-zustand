import { useForm } from "react-hook-form";
import MessageError from "./MessageError";
import type { DraftPatient } from "../types";
import { usePatientStore } from "../store";
import { useEffect } from "react";
import { Slide, toast } from "react-toastify";

const PatientForm = () => {
    const addPatient = usePatientStore((state) => state.addPatient);
    const updatePatient = usePatientStore((state) => state.updatePatient);
    const activeId = usePatientStore((state) => state.activeId);
    const patients = usePatientStore((state) => state.patients);

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<DraftPatient>();

    useEffect(() => {
        if (activeId) {
            const activePatient = patients.filter(
                (patient) => patient.id === activeId
            )[0];

            setValue("name", activePatient.name);
            setValue("caretaker", activePatient.caretaker);
            setValue("email", activePatient.email);
            setValue("date", activePatient.date);
            setValue("symptoms", activePatient.symptoms);
        }
    }, [activeId]);

    const registerPatient = (data: DraftPatient) => {
        if (!activeId) {
            addPatient(data);
            toast.success("Add patient", {
                autoClose: 2500,
                pauseOnHover: false,
                transition: Slide,
            });
        } else {
            updatePatient(data);

            toast.success("Update Patient", {
                autoClose: 2500,
                pauseOnHover: false,
                transition: Slide,
            });
        }
        reset();
    };

    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">
                Seguimiento Pacientes
            </h2>

            <p className="text-lg mt-5 text-center mb-10">
                Añade Pacientes y {""}
                <span className="text-indigo-600 font-bold">Administralos</span>
            </p>

            <form
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
                noValidate
                onSubmit={handleSubmit(registerPatient)}
            >
                <div className="mb-5">
                    <label
                        htmlFor="name"
                        className="text-sm uppercase font-bold"
                    >
                        Paciente
                    </label>
                    <input
                        id="name"
                        className="w-full p-3  border border-gray-100"
                        type="text"
                        placeholder="Nombre del Paciente"
                        {...register("name", {
                            required: "The name is required",
                        })}
                    />
                    {errors.name && (
                        <MessageError>{errors.name?.message}</MessageError>
                    )}
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="caretaker"
                        className="text-sm uppercase font-bold"
                    >
                        Propietario
                    </label>
                    <input
                        id="caretaker"
                        className="w-full p-3  border border-gray-100"
                        type="text"
                        placeholder="Nombre del Propietario"
                        {...register("caretaker", {
                            required: "The caretaker is required",
                        })}
                    />
                    {errors.caretaker && (
                        <MessageError>{errors.caretaker?.message}</MessageError>
                    )}
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="text-sm uppercase font-bold"
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        className="w-full p-3  border border-gray-100"
                        type="email"
                        placeholder="Email de Registro"
                        {...register("email", {
                            required: "The Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Email not valid",
                            },
                        })}
                    />
                    {errors.email && (
                        <MessageError>{errors.email?.message}</MessageError>
                    )}
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="date"
                        className="text-sm uppercase font-bold"
                    >
                        Fecha Alta
                    </label>
                    <input
                        id="date"
                        className="w-full p-3  border border-gray-100"
                        type="date"
                        {...register("date", {
                            required: "The date is required",
                        })}
                    />
                    {errors.date && (
                        <MessageError>{errors.date?.message}</MessageError>
                    )}
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="symptoms"
                        className="text-sm uppercase font-bold"
                    >
                        Síntomas
                    </label>
                    <textarea
                        id="symptoms"
                        className="w-full p-3  border border-gray-100"
                        placeholder="Síntomas del paciente"
                        {...register("symptoms", {
                            required: "The symptoms is required",
                        })}
                    />
                    {errors.symptoms && (
                        <MessageError>{errors.symptoms.message}</MessageError>
                    )}
                </div>

                <input
                    type="submit"
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                    value={`${!activeId ? "Save Patient" : "Edit Patient"}`}
                />
            </form>
        </div>
    );
};
export default PatientForm;
