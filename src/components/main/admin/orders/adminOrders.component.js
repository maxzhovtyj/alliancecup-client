import {Button} from "@mui/material";
import axios from "axios";
import {API_URL} from "../../../../http/http";

const $fileApi = axios.create({
    responseType: "arraybuffer",
    withCredentials: true,
    baseURL: API_URL,
})

function AdminOrdersComponent(props) {
    const getInvoice = async () => {
        try {
            return await $fileApi.get("/api/invoice?id=92d078c7-8730-48af-9124-4d528112ebe0")
        } catch (e) {
            console.log(e)
        }
    }

    const downloadInvoice = () => {
        getInvoice().then(res => {
            const file = new Blob([res.data], {type: 'application/pdf'});

            const fileURL = URL.createObjectURL(file);
            const link = document.createElement('a');
            link.href = fileURL;
            link.download = "invoice.pdf";
            link.click();
        })
    }
    return (
        <div>
            <p>Orders</p>
            <Button variant={"outlined"} onClick={downloadInvoice}>Download</Button>
        </div>
    );
}

export default AdminOrdersComponent;