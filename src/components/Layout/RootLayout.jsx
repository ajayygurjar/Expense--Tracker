import {Outlet} from 'react-router-dom'; 
import Header from "./Header";



const RootLayout=()=>{
    return (
        <main>
            <Header/>
            <div>
                <Outlet/>
            </div>
        </main>
    )
}
export default RootLayout;