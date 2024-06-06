import { usePatientStore } from "../store";
import PatientDetail from "./PatientDetail";

const PatientList = () => {
    const patients = usePatientStore((state) => state.patients);

    return (
        <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">
            {patients.length != 0 ? (
                <>
                    <h2 className="font-black text-3xl text-center">
                        List of pacients
                    </h2>
                    <p className="text-xl mt-5 mb-10 text-center">
                        Manage your
                        <span className="text-indigo-600 font-bold">
                            patients and quotes
                        </span>
                    </p>
                    {patients.map((patient) => (
                        <PatientDetail key={patient.id} patient={patient} />
                    ))}
                </>
            ) : (
                <>
                    <h2 className="font-black text-3xl text-center">
                        There are no patients
                    </h2>
                    <p className="text-xl mt-5 mb-10 text-center">
                        Start adding patients {""}
                        <span className="text-indigo-600 font-bold">
                            and they will appear in this place
                        </span>
                    </p>
                </>
            )}
        </div>
    );
};
export default PatientList;
