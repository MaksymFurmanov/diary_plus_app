import PageTitle from "../components/BasicComponents/PageTitle";
import {useNavigate, useParams} from "react-router-dom";
import {useOrders} from "../providers/OrdersProvider";
import {useMaterials} from "../providers/MaterialsProvider";
import OrdersTable from "../components/Orders/OrdersTable";
import OrdersGraph from "../components/Orders/OrdersGraph";
import {BsPlusCircleFill} from "react-icons/bs";
import {useUser} from "../providers/UserProvider";

const Orders = () => {
    const user = useUser();
    const items = {
        products_to_product: useOrders(),
        raw_materials: useMaterials()
    };

    const {type} = useParams();
    const navigate = useNavigate();

    const title = {
        products_to_product: "Objednávky na výrobu",
        raw_materials: "Objednané suroviny"
    }

    const new_order_page = {
        products_to_product: "/orders/products_to_product/new_order",
        raw_materials: "/orders/raw_materials/new_order_material"
    }

    return <>
        <div className={"h-stretch-center"}>
            <PageTitle name={title[type]}/>
            {user.manager && <button className={"plus-button"}
                    onClick={() => navigate(new_order_page[type])}>
                <BsPlusCircleFill/>
            </button>}
        </div>
        <div className={"OrdersPage"}>
            <OrdersGraph items={items[type]} type={type}/>
            <OrdersTable items={items[type]} type={type}/>
        </div>
    </>
}

export default Orders;