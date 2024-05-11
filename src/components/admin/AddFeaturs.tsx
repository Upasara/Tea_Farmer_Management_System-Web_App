import React, { useState, useEffect } from "react";
import "../assets/css/home.css";
import "../assets/css/bootstrap.min.css";
import "../assets/css/icomoon.css";
import { Button, Modal, Form, Row, Col } from 'reactstrap';
import { AdminService } from "../servises/AdminService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CompanyUpdates } from "../models/CompanyUpdates";
import { Timestamp } from "firebase/firestore";

const AdminAddFetures: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [companyUpdates, setCompany] = useState<CompanyUpdates[]>([]);
    const [modal_center, setModalCenter] = React.useState(false);
    const [updateCompany, setCopmanyUpdate] = useState<CompanyUpdates>({} as CompanyUpdates);
    useEffect(() => {
        getAllUpdates();
    }, []);

    function togCenterReview() {
        setModalCenter(!modal_center);
    }


    const getAllUpdates = () => {
        setIsLoading(true)
        AdminService.getAllUpdates().then(res => {
            const update: any = res
            setCompany(update);
        });
    };

    const addUpdate = () => {
        if (!updateCompany?.type) {
            toast.error("Title is required", {
                position: toast.POSITION.BOTTOM_RIGHT,
                className: "foo-bar",
            });
            return;
        } else if (!updateCompany?.content) {
            toast.error("Content is required", {
                position: toast.POSITION.BOTTOM_RIGHT,
                className: "foo-bar",
            });
            return;
        } else {
            const updated: CompanyUpdates = {
                type: updateCompany?.type,
                content: updateCompany?.content,
                createdAt: Timestamp.now()
            }
            console.log(updated)
            AdminService.companyUpdates(updated).then(res => {
                getAllUpdates();
                setModalCenter(false);
            });
        }
    }


    function deleteCompanyUpdate(id: any) {
        const updated: CompanyUpdates = {
            id: id,
        }
        AdminService.deleteUpdate(updated).then(res => {
            getAllUpdates();
        });
    }


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
                                            onClick={() => {
                                                togCenterReview();
                                            }}
                                            className="btn btn-primary relative mb-3"
                                            style={{
                                                bottom: "0",
                                                float: "right",
                                            }}
                                        >
                                            Create Company Updates
                                        </Button>
                                    </Col>
                                </Row>
                                <div className="edu-course-widget widget-course-summery">
                                    <h2 className="acc mb-4 pl-2 mt-5">Company Updates</h2>
                                    {companyUpdates !== undefined && companyUpdates.length > 0 ? (
                                        <>
                                            <div className="table-responsive">
                                                <table className="table cart-table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col" className="product-subtotal">Title</th>
                                                            <th scope="col" className="product-title">Content</th>
                                                            <th scope="col" className="product-subtotal">CreatedAt</th>
                                                            <th scope="col" className="product-subtotal">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {companyUpdates &&
                                                            companyUpdates.map((us: CompanyUpdates, index: number) => {
                                                                const date = new Date(us.createdAt.seconds * 1000 + us.createdAt.nanoseconds / 1000000);
                                                                const formattedDate = date.toLocaleString?.();
                                                                return (
                                                                    <tr key={index}>
                                                                        <td className="product-price" data-title="Date">
                                                                            {us?.type == 1 ? 'Tea Collecting Price'
                                                                                : us?.type == 2 ? 'Truck Drivers'
                                                                                    : us?.type == 3 ? 'Factory Visiting Hours'
                                                                                        : us?.type == 4 ? 'Tea Fertilizers'
                                                                                            : 'Other Updates'
                                                                            }</td>
                                                                        <td className="product-price" data-title="Level">{us?.content || "-"}</td>
                                                                        <td className="product-price" data-title="Status">{formattedDate}</td>
                                                                        <td>
                                                                            <button className="btn btn-danger btn-sm " onClick={() => {
                                                                                deleteCompanyUpdate(us?.id);
                                                                            }}>
                                                                                <i className="ri-delete-bin-line"></i> Delete
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            })
                                                        }
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
                            toggle={() => {
                                togCenterReview();
                            }} centered >
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
                                    <h4 className="title mb-30 mt-10">Add Update:</h4>
                                    <div className="row g-5 mb-20 justify-content-center">
                                        <div className="col-lg-12">
                                            <div className="form-group mb-20">
                                                <label htmlFor="reg-Name">Title</label>
                                                <select className="form-group f-14" onChange={(e) => setCopmanyUpdate({ ...updateCompany, type: parseInt(e.target.value) })}>
                                                    <option selected>Select Title...</option>
                                                    <option value="1">Tea Collecting Price</option>
                                                    <option value="2">Truck Drivers</option>
                                                    <option value="3">Factory Visiting Hours</option>
                                                    <option value="4">Tea Fertilizers</option>
                                                    <option value="5">Other Updates</option>
                                                </select>
                                            </div>

                                            <div className="form-group mb-20">
                                                <label htmlFor="reg-Name">Content:</label>
                                                <textarea
                                                    name="log-Driving-history" id="log-Driving-history" style={{ minHeight: "200px" }}
                                                    onChange={(e) => setCopmanyUpdate({ ...updateCompany, content: e.target.value })}
                                                />
                                            </div>

                                        </div>
                                    </div>

                                    <Row>
                                        <Col xl={12}>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    addUpdate();
                                                }}
                                                className="btn colorchangeLog leadMargin edu-btn float-right btn-medium mb-20"
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

export default AdminAddFetures;
