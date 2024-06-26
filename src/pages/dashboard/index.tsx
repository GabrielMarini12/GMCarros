import { useState, useEffect, useContext } from "react";
import { Container } from "../../components/container";
import { DashboardHeader } from "../../components/panelheader";

import { FiTrash2 } from "react-icons/fi";

import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { AuthContext } from "../../contexts/AuthContext";

interface CarProps {
  id: string;
  name: string;
  year: string;
  price: string | number;
  city: string;
  km: string;
  uid: string;
  images: ImageCarProps[];
}

interface ImageCarProps {
  name: string;
  id: string;
  url: string;
}

export function Dashboard() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    function loadCars() {
      if (!user?.uid) {
        return;
      }

      const carsRef = collection(db, "cars");
      const queryRef = query(carsRef, where("uid", "==", user.uid));

      getDocs(queryRef).then((snapshot) => {
        const listcars = [] as CarProps[];

        snapshot.forEach((doc) => {
          listcars.push({
            id: doc.id,
            name: doc.data().name,
            year: doc.data().year,
            km: doc.data().km,
            city: doc.data().city,
            price: doc.data().price,
            images: doc.data().images,
            uid: doc.data().uid,
          });
        });

        setCars(listcars);
      });
    }

    loadCars();
  }, [user]);

  return (
    <Container>
      <DashboardHeader />

      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <section className="w-full bg-white rounded-lg relative">
          <button
            onClick={() => {}}
            className="absolute bg-white w-14 h-14 rounded-full flex items-center justify-center right-2 top-2 drop-shadow"
          >
            <FiTrash2 size={26} color="#000" />
          </button>
          <img
            className="w-full rounded-lg mb-2 max-h-70"
            src="https://image.webmotors.com.br/_fotos/anunciousados/gigante/2024/202406/20240615/porsche-panamera-2-9-v6-ehybrid-4s-pdk-wmimagem01103176639.webp?s=fill&w=552&h=414&q=60"
          />
          <p className="font-bold mt-1 px-2 mb-2">Porshe Panamera</p>

          <div className="flex flex-col px-2">
            <span className="text-zinc-700">Ano 2022/2023 | 230.000 km</span>
            <strong className="text-black font-bold mt-4">R$ 150.000</strong>
          </div>

          <div className="w-full h-px bg-slate-200 my-2"></div>

          <div className="px-2 pb-2">
            <span className="text-black">Canoas - RS</span>
          </div>
        </section>
      </main>
    </Container>
  );
}
