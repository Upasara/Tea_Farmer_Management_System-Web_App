import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { auth, db } from "../../firebase";
import { USERS } from "../../dbUtils";
import "../assets/css/home.css";
import "../assets/css/bootstrap.min.css";
import "../assets/css/icomoon.css";
import { UserDetails } from "../models/User";
import { Button, Modal, Form, Input, Row, Col } from 'reactstrap';
import { AdminService } from "../servises/AdminService";
import { TeaDetails } from "../models/Tea";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
toast.configure();

const AdminUserManagement: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState<UserDetails[]>([]);
    const [modal_center, setModalCenter] = React.useState(false);
    const [modal_center2, setModalCenter2] = React.useState(false);
    const [userData, setUserData] = useState<UserDetails>({} as UserDetails);
    const [teaData, setTeaData] = useState<TeaDetails>({} as TeaDetails);


    function getWeekNumberFromTimestamp(timestamp: number): number {
        const date = new Date(timestamp);
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
        const daysSinceFirstDayOfYear = Math.round(
            (date.getTime() - firstDayOfYear.getTime()) / (1000 * 3600 * 24)
        );
        const weekNumber1 = Math.ceil((daysSinceFirstDayOfYear + firstDayOfYear.getDay() + 1) / 7);
        return weekNumber1;
    }


    const myTimestamp = Timestamp.now().toMillis(); // 2021-12-18T00:00:00Z as Unix timestamp (in milliseconds)
    const weekNumber = getWeekNumberFromTimestamp(myTimestamp);
    console.log(weekNumber);

    function togCenterReview(id: any) {
        setTeaData({ ...teaData, id: id })
        setModalCenter(!modal_center);
    }

    function togCenterReview2() {
        setModalCenter2(!modal_center2);
    }

    useEffect(() => {
        getAllUsers();
    }, []);


    const getAllUsers = () => {
        setIsLoading(true)
        AdminService.getAllUsers().then(res => {
            const userData: any = res
            setUsers(userData);
        });
    };

    const addUser = () => {
        if (!userData?.tel) {
            toast.error("Phone number is required", {
                position: toast.POSITION.BOTTOM_RIGHT,
                className: "foo-bar",
            });
            return;
        } else {
            const updatedUser: UserDetails = {
                tel: userData?.tel,
                status: "pending",
                role: "USER",
                registrationNumber: (Math.floor(Math.random() * 900000) + 100000).toString()
            }
            AdminService.addUser(updatedUser).then(res => {
                getAllUsers();
                setModalCenter2(false);
            });
        }
    }

    let totalData: number | undefined;
    if (teaData?.monthlyFee !== undefined) {
        totalData = teaData.teaAmount as number * teaData.monthlyFee as number;
    } else {
        totalData = undefined;
    }

    const addTeaData = () => {
        if (!teaData?.teaAmount) {
            toast.error("Tea amount is required", {
                position: toast.POSITION.BOTTOM_RIGHT,
                className: "foo-bar",
            });
            return;
        } else if (!teaData?.quality) {
            toast.error("Quality is required", {
                position: toast.POSITION.BOTTOM_RIGHT,
                className: "foo-bar",
            });
            return;
        } else if (!teaData?.monthlyFee) {
            toast.error("Monthly fee is required", {
                position: toast.POSITION.BOTTOM_RIGHT,
                className: "foo-bar",
            });
            return;
        } else {

            const updatedUser: TeaDetails = {
                teaAmount: teaData?.teaAmount as number,
                monthlyFee: teaData?.monthlyFee as number,
                quality: teaData?.quality,
                total: totalData,
                createdAt: Timestamp.now(),
                id: teaData?.id,
            }

            AdminService.addNew(updatedUser).then(res => {
                getAllUsers();
                setModalCenter(false);
            });
        }
    }

    // const [searchQuery, setSearchQuery] = useState('');

    // const searchUser = () => {
    //     const updatedUser: any = {
    //         name: searchQuery,
    //     }
    //     AdminService.addUser(updatedUser).then(res => {
    //         getAllUsers();
    //         setModalCenter2(false);
    //     });
    // }

    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        async function fetchSearchResults() {
            const usersCollection = collection(db, USERS);
            const q = query(usersCollection, where('name', '>=', searchQuery));
            const querySnapshot = await getDocs(q);
            const results = querySnapshot.docs.map((doc) => doc.data());
            setUsers(results as any);
        }

        if (searchQuery) {
            fetchSearchResults();
            
        } else {
            setUsers([]);
        }
    }, [searchQuery]);
    
    return (
        <div className="bg-all">
            <div className="edu-breadcrumb-area breadcrumb-style-3">
                <div className="container">
                    <div className="breadcrumb-inner accHegiht">

                    </div>
                </div>
            </div>
            <section className="edu-section-gap course-details-area">
                <div className="container">
                    <div className="row row--30">

                        <div className="col-lg-12">

                            <div className="course-sidebar-3 sidebar-top-position">
                                <Row>
                                    <Col xl={12}>
                                        <Button
                                            className="btn btn-primary relative mb-3"
                                            onClick={() => {
                                                togCenterReview2();
                                            }}
                                            style={{
                                                bottom: "0",
                                                float: "right",
                                            }}
                                        >
                                            Create User
                                        </Button>
                                    </Col>
                                </Row>
                                <div className="edu-course-widget widget-course-summery">
                                    <h2 className="acc mb-4 pl-2 mt-5">The List Of Users</h2>
                                    <Row>
                                                <Col xl={9}></Col>

                                                <Col xl={3}>
                                                    <Input
                                                        type="text"
                                                        className="input-boarder float-right"
                                                        style={{
                                                            bottom: "0",
                                                            float: "right",
                                                        }}
                                                        value={searchQuery}
                                                        onChange={(e) => setSearchQuery(e.target.value)}
                                                        placeholder="Search by name"
                                                    />
                                                </Col>

                                            </Row> 
                                    {users !== undefined && users.length > 0 ? (
                                        <>
                                            <div className="table-responsive">
                                                <table className="table cart-table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col" className="product-subtotal">Reg No</th>
                                                            <th scope="col" className="product-title">Name</th>
                                                            <th scope="col" className="product-price">Email</th>
                                                            <th scope="col" className="product-subtotal">Address</th>
                                                            {/* <th scope="col" className="product-subtotal">Collector</th> */}
                                                            <th scope="col" className="product-subtotal">Phone</th>
                                                            <th scope="col" className="product-subtotal">Status</th>
                                                            <th scope="col" className="product-subtotal">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        {users &&
                                                            users.map((us: UserDetails, index: number) => {
                                                                const weekNumber2 = getWeekNumberFromTimestamp(us?.lastUpdatedAt?.toMillis());
                                                                return (
                                                                    <tr key={index}>
                                                                        <td className="product-price" data-title="Date">{us?.registrationNumber || "-"}</td>
                                                                        <td className="product-price" data-title="Level">{us?.name || "-"}</td>
                                                                        <td className="product-price" data-title="Status">{us?.email || "-"}</td>
                                                                        <td className="product-price" data-title="Date">{us?.address || "-"} </td>
                                                                        {/* <td className="product-price" data-title="Date">{us?.collector || "-"} </td> */}
                                                                        <td className="product-price" data-title="Level">{us?.tel || "-"}</td>
                                                                        <td className="product-price" data-title="Level"> <span className="newtag">{us?.status}</span></td>
                                                                        <td className="product-price" data-title="Status">
                                                                            <div className="d-flex p-0">
                                                                                <div className="">
                                                                                    <button
                                                                                        className="btn btn-success mr-10"
                                                                                        data-value1={""}
                                                                                        onClick={() => {
                                                                                            togCenterReview(us?.id);
                                                                                        }}
                                                                                        disabled={weekNumber === weekNumber2}
                                                                                    >
                                                                                        Add
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </>
                                    ) : (
                                        <>{isLoading ? <div /> : <h5>No users Available</h5>}</>
                                    )}
                                </div>
                            </div>
                        </div>

                        <Modal isOpen={modal_center}
                            centered >
                            <div className="modal-header">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setModalCenter(false);
                                    }}
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <Form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        return false;
                                    }}
                                >
                                    <h4 className="title mb-30 mt-10">Add Information:</h4>
                                    <div className="row g-5 mb-20 justify-content-center">
                                        <div className="col-lg-12">
                                            <div className="form-group mb-20">
                                                <label htmlFor="reg-Name">Amount of tea leaves:</label>
                                                <Input
                                                    type="number"
                                                    name="makeAndModel"
                                                    className="input-boarder"
                                                    id="makeAndModel"
                                                    onChange={(e) => setTeaData({ ...teaData, teaAmount: parseInt(e.target.value) })}

                                                />
                                            </div>

                                            <div className="form-group mb-20">
                                                <label htmlFor="reg-Name">Quality:</label>
                                                <select className="form-group f-14" onChange={(e) => setTeaData({ ...teaData, quality: parseInt(e.target.value) })}>
                                                    <option selected>Select Title...</option>
                                                    <option value="1">Quality 1</option>
                                                    <option value="2">Quality 2</option>
                                                </select>
                                            </div>

                                            <div className="form-group mb-20">
                                                <label htmlFor="reg-Name">Monthly Fee:</label>
                                                <Input
                                                    type="text"
                                                    name="milage"
                                                    className="input-boarder"
                                                    id="milage"
                                                    onChange={(e) => setTeaData({ ...teaData, monthlyFee: parseInt(e.target.value) })}

                                                />
                                            </div>

                                            <div className="form-group mb-20">
                                                <label htmlFor="reg-Name">Total:</label>
                                                <Input
                                                    type="text"
                                                    name="milage"
                                                    className="input-boarder"
                                                    id="milage"
                                                    value={totalData}
                                                    disabled


                                                />
                                            </div>

                                        </div>
                                    </div>

                                    <Row>
                                        <Col xl={12}>
                                            <button
                                                type="submit"
                                                className="btn colorchangeLog leadMargin float-right edu-btn btn-medium mb-20"
                                                onClick={() => {
                                                    addTeaData();
                                                }}
                                            >
                                                <div>Submit</div>
                                            </button>
                                        </Col>
                                    </Row>

                                </Form>
                            </div>
                        </Modal>


                        <Modal isOpen={modal_center2}
                            toggle={() => {
                                togCenterReview2();
                            }} centered >
                            <div className="modal-header">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setModalCenter2(false);
                                    }}
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <Form
                                >
                                    <h4 className="title mb-30 mt-10">Add User:</h4>
                                    <div className="row g-5 mb-20 justify-content-center">
                                        <div className="col-lg-12">
                                            <div className="form-group mb-20">
                                                <label htmlFor="reg-Name">Phone Number:</label>
                                                <Input
                                                    type="text"
                                                    name="makeAndModel"
                                                    className="input-boarder"
                                                    onChange={(e) => setUserData({ ...userData, tel: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <Row>
                                        <Col xl={12}>
                                            <button
                                                type="button"
                                                className="btn colorchangeLog leadMargin edu-btn btn-medium float-right mb-20"
                                                onClick={() => {
                                                    addUser();
                                                }}
                                            >

                                                <div>Submit</div>
                                            </button>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </Modal>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AdminUserManagement;
