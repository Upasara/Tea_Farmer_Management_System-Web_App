import React, { useState, useEffect } from "react";
import "../assets/css/home.css";
import "../assets/css/bootstrap.min.css";
import "../assets/css/icomoon.css";
import { Complains } from "../models/Complains";
import { Modal, Form,  Input, Row, Col } from 'reactstrap';
import { AdminService } from "../servises/AdminService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminClientReport: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [complains, setComplains] = useState<Complains[]>([]);
    console.log(complains)
    const [modal_center, setModalCenter] = React.useState(false);
    const [complainsData, setComplainsData] = useState<Complains>({} as Complains);
    useEffect(() => {
        getAllComplains();
    }, []);


    const getAllComplains = () => {
        setIsLoading(true)
        AdminService.getAllComplains().then(res => {
            const update: any = res
            setComplains(update);
        });
    };

    function togCenterReview(id: any) {
        setComplainsData({ ...complainsData, id: id })
        setModalCenter(!modal_center);
    }

    const addReview = () => {
        if (!complainsData?.reply) {
            toast.error("Phone number is required", {
                position: toast.POSITION.BOTTOM_RIGHT,
                className: "foo-bar",
            });
            return;
        } else {
            const updatedComplain: Complains = {
                id: complainsData?.id,
                reply: complainsData?.reply,
            }
            AdminService.addReview(updatedComplain).then(res => {
                getAllComplains();
                setModalCenter(false);
            });
        }
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
                                <div className="edu-course-widget widget-course-summery">
                                <h2 className="acc mb-4 pl-2 mt-5">Tea Farmer Complains</h2>
                                    {complains !== undefined && complains.length > 0 ? (
                                        <>
                                            <div className="table-responsive">
                                                <table className="table cart-table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col" className="product-subtotal">Complain</th>
                                                            <th scope="col" className="product-title">User</th>
                                                            <th scope="col" className="product-subtotal">Reply</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {complains &&
                                                            complains.map((us: Complains, index: number) => {
                                                                return (
                                                                    <tr key={index}>
                                                                        <td className="product-price" data-title="Date">{us?.complain || "-"}</td>
                                                                        <td className="product-price" data-title="Level">{us?.user || "-"}</td>
                                                                        <td className="product-price" data-title="Status">
                                                                            {!us?.reply ? (
                                                                                <div className="d-flex p-0">
                                                                                    <div className="">
                                                                                        <button className="btn btn-success mr-10" data-value1={""} onClick={() => {
                                                                                            togCenterReview(us?.id);
                                                                                        }}  >Add</button>
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                                :
                                                                                us?.reply
                                                                            }
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
                                >
                                    <h4 className="title mb-30 mt-10">Add Reply:</h4>
                                    <div className="row g-5 mb-20 justify-content-center">
                                        <div className="col-lg-12">
                                            <div className="form-group mb-20">
                                                <label htmlFor="reg-Name">Reply:</label>
                                                <Input
                                                    type="text"
                                                    name="makeAndModel"
                                                    className="input-boarder"
                                                    onChange={(e) => setComplainsData({ ...complainsData, reply: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <Row>
                                        <Col xl={12}>
                                            <button
                                                type="button"
                                                className="btn colorchangeLog leadMargin edu-btn float-right btn-medium mb-20"
                                                onClick={() => {
                                                    addReview();
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

export default AdminClientReport;
