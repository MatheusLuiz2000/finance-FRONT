import { UilUtensilsAlt } from "@iconscout/react-unicons";
import { UilCar } from "@iconscout/react-unicons";
import { UilHome } from "@iconscout/react-unicons";
import { UilWheelchair } from "@iconscout/react-unicons";
import { UilBookAlt } from "@iconscout/react-unicons";
import { UilInvoice } from "@iconscout/react-unicons";
import { UilPhone } from "@iconscout/react-unicons";
import { UilHouseUser } from "@iconscout/react-unicons";
import { UilRestaurant } from "@iconscout/react-unicons";
import { UilGift } from "@iconscout/react-unicons";
import { UilPump } from "@iconscout/react-unicons";
import { UilRobot } from "@iconscout/react-unicons";
import { UilPizzaSlice } from "@iconscout/react-unicons";
import { UilShoppingBag } from "@iconscout/react-unicons";
import { UilShip } from "@iconscout/react-unicons";
import { UilUsersAlt } from "@iconscout/react-unicons";
import { UilSelfie } from "@iconscout/react-unicons";
import { UilCarWash } from "@iconscout/react-unicons";
import { UilBus } from "@iconscout/react-unicons";
import { UilServicemark } from "@iconscout/react-unicons";
import { UilHospital } from "@iconscout/react-unicons";
import { UilUserPlus } from "@iconscout/react-unicons";
import { useMemo } from "react";

export default function getCategoryIcon({ category }) {
  const Teste = useMemo(() => {
    let icon;

    switch (category) {
      case "Alimentação":
        icon = UilUtensilsAlt;
        break;
      case "Carro":
        icon = UilCarWash;
        break;
      case "Coisas para Casa":
        icon = UilHome;
        break;
      case "Doação":
        icon = UilWheelchair;
        break;
      case "Educação":
        icon = UilBookAlt;
        break;
      case "Imposto":
        icon = UilInvoice;
        break;
      case "Internet/Telefone":
        icon = UilPhone;
        break;
      case "Aluguel":
        icon = UilHouseUser;
        break;
      case "Restaurante":
        icon = UilRestaurant;
        break;
      case "Roupa":
        icon = UilUserPlus;
        break;
      case "Saúde":
        icon = UilHospital;
        break;
      case "Serviços":
        icon = UilServicemark;
        break;
      case "Transporte":
        icon = UilBus;
        break;
      case "Uber":
        icon = UilCar;
        break;
      case "Viagem":
        icon = UilShip;
        break;
      case "Supermercado":
        icon = UilShoppingBag;
        break;
      case "Presente para Mim":
        icon = UilGift;
        break;
      case "Coisas tecnologicas":
        icon = UilRobot;
        break;
      case "Presente para alguem":
        icon = UilGift;
        break;
      case "Passeio":
        icon = UilUsersAlt;
        break;
      case "Combustível":
        icon = UilPump;
        break;
      case "Lazer":
        icon = UilSelfie;
        break;
      default:
        break;
    }

    return icon;
  }, [category])

  return (
    <>
      <Teste color="#1e1e2d" />
    </>
  );
}
