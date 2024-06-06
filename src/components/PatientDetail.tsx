import PatientDetailItem from "./PatientDetailItem";
import { usePatientStore } from "../store";
import { Patient } from "../types";
import { Slide, toast } from "react-toastify";

type PatientDetailProps = {
    patient: Patient;
};

const PatientDetail = ({ patient }: PatientDetailProps) => {
    const deletePatient = usePatientStore((state) => state.deletePatient);
    const getPatientById = usePatientStore((state) => state.getPatientById);

    return (
        <div className="mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl">
            <PatientDetailItem label="ID" data={patient.id} />
            <PatientDetailItem label="name" data={patient.name} />
            <PatientDetailItem label="caretaker" data={patient.caretaker} />
            <PatientDetailItem label="email" data={patient.email} />
            <PatientDetailItem label="date" data={patient.date.toString()} />
            <PatientDetailItem label="symptoms" data={patient.symptoms} />
            <div className="flex flex-col lg:flex-row gap-3 justify-between mt-10">
                <button
                    type="button"
                    className="py-2 px-10 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg uppercase"
                    onClick={() => getPatientById(patient.id)}
                >
                    Edit
                </button>
                <button
                    type="button"
                    className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg uppercase"
                    onClick={() => {
                        deletePatient(patient.id);
                        toast.error("Delete patient", {
                            autoClose: 2500,
                            pauseOnHover: false,
                            transition: Slide,
                        });
                    }}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};
export default PatientDetail;
