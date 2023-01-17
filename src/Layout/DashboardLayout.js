import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import AdminHeader from '../Admin/AdminHeader';
import AdminNav from '../Admin/AdminNav';
import Footer from '../Sheard/Footer/Footer';
import Header from '../Sheard/Header/Header';

const DashboardLayout = () => {
    return (

        <>
        <AdminHeader></AdminHeader>
        <div className="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                <Outlet></Outlet>
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                    <li><Link to='/dashboard'>Dashboard</Link></li>
                    <li><Link to='/dashboard/allproducts'>All Products</Link></li>
                    <li><Link to='/dashboard/addproducts'>Add Products</Link></li>
                    <li><Link>Orders</Link></li>
                    <li><Link>Users</Link></li>
                    <li><Link to='/'>Home</Link></li>

                </ul>

            </div>
        </div>
        </>
    );
};

export default DashboardLayout;

