--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.2

-- Started on 2021-07-02 22:45:11

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 200 (class 1259 OID 32769)
-- Name: grade; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.grade (
    idmodules integer NOT NULL,
    idstudent integer NOT NULL,
    idsemester character varying(50) NOT NULL,
    lblgrade character varying(50) NOT NULL,
    numbergrade numeric(2,2),
    coeffgrade integer
);


ALTER TABLE public.grade OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 32774)
-- Name: module; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.module (
    idmodules integer NOT NULL,
    lblmodule character varying(50)
);


ALTER TABLE public.module OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 32779)
-- Name: promotion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.promotion (
    yearpromotion date NOT NULL
);


ALTER TABLE public.promotion OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 32784)
-- Name: sector; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sector (
    idsector integer NOT NULL,
    lblsector character varying(50) NOT NULL
);


ALTER TABLE public.sector OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 32826)
-- Name: sector_idsector_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.sector ALTER COLUMN idsector ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.sector_idsector_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 100
    CACHE 1
    CYCLE
);


--
-- TOC entry 204 (class 1259 OID 32789)
-- Name: semester; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.semester (
    idsemester character varying(50) NOT NULL
);


ALTER TABLE public.semester OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 32794)
-- Name: student; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.student (
    idstudent integer NOT NULL,
    yearpromotion date NOT NULL,
    idsector integer NOT NULL,
    mailstudent character varying(50) NOT NULL,
    passwordstudent character varying(100) NOT NULL,
    pseudostudent character varying(30) NOT NULL
);


ALTER TABLE public.student OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 32824)
-- Name: student_idstudent_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.student ALTER COLUMN idstudent ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.student_idstudent_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 10000
    CACHE 1
    CYCLE
);


--
-- TOC entry 3019 (class 0 OID 32769)
-- Dependencies: 200
-- Data for Name: grade; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.grade (idmodules, idstudent, idsemester, lblgrade, numbergrade, coeffgrade) FROM stdin;
\.


--
-- TOC entry 3020 (class 0 OID 32774)
-- Dependencies: 201
-- Data for Name: module; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.module (idmodules, lblmodule) FROM stdin;
\.


--
-- TOC entry 3021 (class 0 OID 32779)
-- Dependencies: 202
-- Data for Name: promotion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.promotion (yearpromotion) FROM stdin;
2020-09-01
\.


--
-- TOC entry 3022 (class 0 OID 32784)
-- Dependencies: 203
-- Data for Name: sector; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sector (idsector, lblsector) FROM stdin;
1	IRC
\.


--
-- TOC entry 3023 (class 0 OID 32789)
-- Dependencies: 204
-- Data for Name: semester; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.semester (idsemester) FROM stdin;
\.


--
-- TOC entry 3024 (class 0 OID 32794)
-- Dependencies: 205
-- Data for Name: student; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.student (idstudent, yearpromotion, idsector, mailstudent, passwordstudent, pseudostudent) FROM stdin;
\.


--
-- TOC entry 3032 (class 0 OID 0)
-- Dependencies: 207
-- Name: sector_idsector_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sector_idsector_seq', 1, true);


--
-- TOC entry 3033 (class 0 OID 0)
-- Dependencies: 206
-- Name: student_idstudent_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.student_idstudent_seq', 1, false);


--
-- TOC entry 2873 (class 2606 OID 32773)
-- Name: grade grade_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grade
    ADD CONSTRAINT grade_pkey PRIMARY KEY (idmodules, idstudent, idsemester, lblgrade);


--
-- TOC entry 2875 (class 2606 OID 32778)
-- Name: module module_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.module
    ADD CONSTRAINT module_pkey PRIMARY KEY (idmodules);


--
-- TOC entry 2877 (class 2606 OID 32783)
-- Name: promotion promotion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.promotion
    ADD CONSTRAINT promotion_pkey PRIMARY KEY (yearpromotion);


--
-- TOC entry 2879 (class 2606 OID 32788)
-- Name: sector sector_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sector
    ADD CONSTRAINT sector_pkey PRIMARY KEY (idsector);


--
-- TOC entry 2881 (class 2606 OID 32793)
-- Name: semester semester_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.semester
    ADD CONSTRAINT semester_pkey PRIMARY KEY (idsemester);


--
-- TOC entry 2883 (class 2606 OID 32798)
-- Name: student student_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student
    ADD CONSTRAINT student_pkey PRIMARY KEY (idstudent);


--
-- TOC entry 2885 (class 2606 OID 32804)
-- Name: grade fk_grade_module; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grade
    ADD CONSTRAINT fk_grade_module FOREIGN KEY (idmodules) REFERENCES public.module(idmodules) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 2884 (class 2606 OID 32799)
-- Name: grade fk_grade_semester; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grade
    ADD CONSTRAINT fk_grade_semester FOREIGN KEY (idsemester) REFERENCES public.semester(idsemester) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 2886 (class 2606 OID 32809)
-- Name: grade fk_grade_student; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grade
    ADD CONSTRAINT fk_grade_student FOREIGN KEY (idstudent) REFERENCES public.student(idstudent) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 2887 (class 2606 OID 32814)
-- Name: student fk_student_promotion; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student
    ADD CONSTRAINT fk_student_promotion FOREIGN KEY (yearpromotion) REFERENCES public.promotion(yearpromotion) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 2888 (class 2606 OID 32819)
-- Name: student fk_student_sector; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student
    ADD CONSTRAINT fk_student_sector FOREIGN KEY (idsector) REFERENCES public.sector(idsector) ON UPDATE RESTRICT ON DELETE RESTRICT;


-- Completed on 2021-07-02 22:45:12

--
-- PostgreSQL database dump complete
--

