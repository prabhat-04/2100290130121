import React, { useState } from "react";
import axios from "axios";
import {AUTORIZATION_TOKEN, EVEN_NUMBER, FIBONACCI_NUMBER, PRIME_NUMBER} from "./api.js";
import {Button, Card, Col, Row, Typography, message, Spin} from "antd";

const Calculator = () => {
    const [primeNumber, setPrimeNumber] = useState([]);
    const [evenNumber, setEvenNumber] = useState([]);
    const [fibonacciNumber, setFibonacciNumber] = useState([]);
    const [randomNumber, setRandomNumber] = useState([]);
    const [prevPrimeNumbers, setPrevPrimeNumbers ] = useState([]);
    const [prevEvenNumbers, setPrevEvenNumbers] = useState([]);
    const [prevFibonacciNumbers, setPrevFibonacciNumbers] = useState([]);
    const [prevRandomNumbers, setPrevRandomNumbers] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleError = (err) => {
        if (err.code === "ECONNABORTED") {
            message.error("Request TimeOut");
        } else {
            message.error(err.message);
        }
    };

    const loadPrimeNumber = async () => {
        setLoading(true);
        try {
            const response = await axios.get(PRIME_NUMBER, {
                headers: {
                    Authorization: `Bearer ${AUTORIZATION_TOKEN}`
                },
            });
            setPrevPrimeNumbers([primeNumber]);
            setPrimeNumber(response?.data?.numbers);
        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const loadEvenNumber = async () => {
        setLoading(true);
        try {
            const response = await axios.get(EVEN_NUMBER, {
                headers: {
                    Authorization: `Bearer ${AUTORIZATION_TOKEN}`
                },
            });
            setPrevEvenNumbers([evenNumber]);
            setEvenNumber(response?.data?.numbers);
        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const loadFibonacciNumber = async () => {
        setLoading(true);
        try {
            const response = await axios.get(FIBONACCI_NUMBER, { headers: {
                Authorization: `Bearer ${AUTORIZATION_TOKEN}`
            }, });
            setPrevFibonacciNumbers([fibonacciNumber]);
            setFibonacciNumber(response?.data?.numbers);
        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const loadRandomNumber = async () => {
        setLoading(true);
        try {
            const response = await axios.get(EVEN_NUMBER, { headers: {
                Authorization: `Bearer ${AUTORIZATION_TOKEN}`
            }, });
            setPrevRandomNumbers([randomNumber]);
            setRandomNumber(response?.data?.numbers);
        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const calculateAverage = (numbers) => {
        if (numbers.length === 0) return 0;
        const sum = numbers.reduce((acc, curr) => acc + curr, 0);
        return sum / numbers.length;
    };

    const formatResponse = (prevNumbers, currNumbers) => {
        const mergedNumbers = [...new Set([...prevNumbers, ...currNumbers])].sort((a, b) => a - b);
        const avg = calculateAverage(currNumbers);
        return {
            windowPrevState: prevNumbers,
            windowCurrState: currNumbers,
            numbers: mergedNumbers,
            avg: avg.toFixed(2)
        };
    };

    return (
        <Card style={{ borderRadius: "20px", boxShadow: "0px 3px 6px #00000012" }}>
            <Spin spinning={loading}>
                <Row gutter={24}>
                    <Col span={4} style={{ display: "flex", justifyContent: "start" }}>
                        <Typography style={{ fontSize: "20px", fontFamily: "Poppins, SemiBold", textAlign: "center", fontWeight: "600" }}>
                        Prime Numbers{" "}
                        </Typography>
                    </Col>
                    <Col span={4}>
                        <Button
                            type="primary"
                            size="large"
                            style={{ borderRadius: "5px", color: "#fff", background: "#05377B", borderColor: "#05377B", marginRight: "10px" }}
                            onClick={loadPrimeNumber}
                        >
                        Fetch Prime Numbers
                        </Button>
                    </Col>
                    <Col span={16}>
                        <Typography>
                            Previous State: {prevPrimeNumbers?.join(", ")}
                            <br />
                            Current State: {primeNumber?.join(", ")}
                            <br />
                            Fetched Numbers: {formatResponse(prevPrimeNumbers, primeNumber).numbers.join(", ")}
                            <br />
                            Average: {formatResponse(prevPrimeNumbers, primeNumber).avg}
                        </Typography>
                    </Col>
                </Row>
                <Row gutter={24} style={{marginTop:"20px"}}>
                    <Col span={4} style={{ display: "flex", justifyContent: "start" }}>
                        <Typography style={{ fontSize: "20px", fontFamily: "Poppins, SemiBold", textAlign: "center", fontWeight: "600" }}>
                        Even Numbers{" "}
                        </Typography>
                    </Col>
                    <Col span={4}>
                        <Button
                            type="primary"
                            size="large"
                            style={{ borderRadius: "5px", color: "#fff", background: "#05377B", borderColor: "#05377B", marginRight: "10px" }}
                            onClick={loadEvenNumber}
                        >
                        Fetch Even Numbers
                        </Button>
                    </Col>
                    <Col span={16}>
                        <Typography>
                            Previous State: {prevEvenNumbers?.join(", ")}
                            <br />
                            Current State: {evenNumber?.join(", ")}
                            <br />
                            Fetched Numbers: {formatResponse(prevEvenNumbers, evenNumber).numbers.join(", ")}
                            <br />
                            Average: {formatResponse(prevEvenNumbers, evenNumber).avg}
                        </Typography>
                    </Col>
                </Row>
                <Row gutter={24} style={{marginTop:"20px"}}>
                    <Col span={4} style={{ display: "flex", justifyContent: "start" }}>
                        <Typography style={{ fontSize: "20px", fontFamily: "Poppins, SemiBold", textAlign: "center", fontWeight: "600" }}>
                        Fibonacci Numbers{" "}
                        </Typography>
                    </Col>
                    <Col span={4}>
                        <Button
                            type="primary"
                            size="large"
                            style={{ borderRadius: "5px", color: "#fff", background: "#05377B", borderColor: "#05377B", marginRight: "10px" }}
                            onClick={loadFibonacciNumber}
                        >
                        Fetch Fibonacci Numbers
                        </Button>
                    </Col>
                    <Col span={16}>
                        <Typography>
                            Previous State: {prevFibonacciNumbers?.join(", ")}
                            <br />
                            Current State: {fibonacciNumber?.join(", ")}
                            <br />
                            Fetched Numbers: {formatResponse(prevFibonacciNumbers, fibonacciNumber).numbers.join(", ")}
                            <br />
                            Average: {formatResponse(prevFibonacciNumbers, fibonacciNumber).avg}
                        </Typography>
                    </Col>
                </Row>
                <Row gutter={24} style={{marginTop:"20px"}}>
                    <Col span={4} style={{ display: "flex", justifyContent: "start" }}>
                        <Typography style={{ fontSize: "20px", fontFamily: "Poppins, SemiBold", textAlign: "center", fontWeight: "600" }}>
                        Random Numbers{" "}
                        </Typography>
                    </Col>
                    <Col span={4}>
                        <Button
                            type="primary"
                            size="large"
                            style={{ borderRadius: "5px", color: "#fff", background: "#05377B", borderColor: "#05377B", marginRight: "10px" }}
                            onClick={loadRandomNumber}
                        >
                        Fetch Random Numbers
                        </Button>
                    </Col>
                    <Col span={16}>
                        <Typography>
                            Previous State: {prevRandomNumbers?.join(", ")}
                            <br />
                            Current State: {randomNumber?.join(", ")}
                            <br />
                            Fetched Numbers: {formatResponse(prevRandomNumbers, randomNumber).numbers.join(", ")}
                            <br />
                            Average: {formatResponse(prevRandomNumbers, randomNumber).avg}
                        </Typography>
                    </Col>
                </Row>
            </Spin>
        </Card>
    );
};

export default Calculator;
