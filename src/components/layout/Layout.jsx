import React, { useEffect } from 'react';
import Header from '../shared/Header';
import LeftSide from '../shared/LeftSide';
import RightSide from '../shared/RightSide';

const Layout = ({ props }) => {

    useEffect(() => {
        // console.log("Layout")
    }, [])

    return (
        <div className='row m-0' style={{ height: "100vh" }}>
            <div className="col-sm-12 col-md-12 border border-2 border-dark" style={{ backgroundColor: "#deeaf6", height: "10vh", position: "fixed" }}>
                <Header />
            </div>
            <div className="col-sm-12 col-md-12 col-xl-12 p-0" style={{ height: "1440px", marginTop: "10vh" }}>
                <div className="d-flex h-100">
                    <LeftSide />
                    <div className="w-50" style={{ backgroundColor: "#e2efd9" }}>
                        {props}
                    </div>
                    <RightSide />
                </div>
            </div>
        </div >
    );
};

export default Layout;


    //    // <div>

    //         {/* <header>
    //             <div className="fixed-top border border-3 border-warning">
    //                 <h1 className=''>Header</h1>
    //             </div>
    //         </header>
    //         <section>
    //             <br />
    //             <div className="mt-5 border">
    //                 <div className=''>
    //                     <div>
    //                         <h1>Left side</h1>
    //                     </div>
    //                     <div>
    //                         <h1>Body</h1>
    //                     </div>
    //                     <div>
    //                         <h1>Right side</h1>
    //                     </div>
    //                 </div>
    //             </div>
    //         // </section> */}
    //         // {/* <Header />
    //         // {props}
    //         // <LeftSide />
    //         // <RightSide />
    //         // <Footer /> */}
    //     // </div>