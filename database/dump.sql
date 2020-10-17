--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)

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

ALTER TABLE IF EXISTS ONLY public.products DROP CONSTRAINT IF EXISTS products_pkey;
ALTER TABLE IF EXISTS ONLY public.orders DROP CONSTRAINT IF EXISTS orders_pkey;
ALTER TABLE IF EXISTS ONLY public.carts DROP CONSTRAINT IF EXISTS carts_pkey;
ALTER TABLE IF EXISTS ONLY public."cartItems" DROP CONSTRAINT IF EXISTS "cartItems_pkey";
ALTER TABLE IF EXISTS public.products ALTER COLUMN "productId" DROP DEFAULT;
ALTER TABLE IF EXISTS public.orders ALTER COLUMN "orderId" DROP DEFAULT;
ALTER TABLE IF EXISTS public.carts ALTER COLUMN "cartId" DROP DEFAULT;
ALTER TABLE IF EXISTS public."cartItems" ALTER COLUMN "cartItemId" DROP DEFAULT;
DROP SEQUENCE IF EXISTS public."products_productId_seq";
DROP TABLE IF EXISTS public.products;
DROP SEQUENCE IF EXISTS public."orders_orderId_seq";
DROP TABLE IF EXISTS public.orders;
DROP SEQUENCE IF EXISTS public."carts_cartId_seq";
DROP TABLE IF EXISTS public.carts;
DROP SEQUENCE IF EXISTS public."cartItems_cartItemId_seq";
DROP TABLE IF EXISTS public."cartItems";
DROP EXTENSION IF EXISTS plpgsql;
DROP SCHEMA IF EXISTS public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: cartItems; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."cartItems" (
    "cartItemId" integer NOT NULL,
    "cartId" integer NOT NULL,
    "productId" integer NOT NULL,
    price integer NOT NULL
);


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."cartItems_cartItemId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."cartItems_cartItemId_seq" OWNED BY public."cartItems"."cartItemId";


--
-- Name: carts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.carts (
    "cartId" integer NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: carts_cartId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."carts_cartId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: carts_cartId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."carts_cartId_seq" OWNED BY public.carts."cartId";


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    "orderId" integer NOT NULL,
    "cartId" integer NOT NULL,
    name text NOT NULL,
    "creditCard" text NOT NULL,
    "shippingAddress" text NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: orders_orderId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."orders_orderId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_orderId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."orders_orderId_seq" OWNED BY public.orders."orderId";


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    "productId" integer NOT NULL,
    name text NOT NULL,
    price integer NOT NULL,
    image text NOT NULL,
    "shortDescription" text NOT NULL,
    "longDescription" text NOT NULL
);


--
-- Name: products_productId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."products_productId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_productId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."products_productId_seq" OWNED BY public.products."productId";


--
-- Name: cartItems cartItemId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems" ALTER COLUMN "cartItemId" SET DEFAULT nextval('public."cartItems_cartItemId_seq"'::regclass);


--
-- Name: carts cartId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts ALTER COLUMN "cartId" SET DEFAULT nextval('public."carts_cartId_seq"'::regclass);


--
-- Name: orders orderId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN "orderId" SET DEFAULT nextval('public."orders_orderId_seq"'::regclass);


--
-- Name: products productId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN "productId" SET DEFAULT nextval('public."products_productId_seq"'::regclass);


--
-- Data for Name: cartItems; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."cartItems" ("cartItemId", "cartId", "productId", price) FROM stdin;
102	180	1	2999
103	181	3	2900
104	181	1	2999
105	182	1	2999
106	182	2	2595
107	182	3	2900
108	182	4	999
109	182	5	9900
110	182	6	830
111	182	3	2900
112	184	2	2595
113	184	4	999
114	184	5	9900
115	185	1	2999
116	185	2	2595
117	185	3	2900
118	186	3	2900
119	186	2	2595
120	186	1	2999
121	187	3	2900
122	188	3	2900
123	189	2	2595
124	190	2	2595
125	191	1	29995
126	191	4	9495
127	191	4	9495
128	191	4	9495
129	191	2	8500
130	191	1	29995
131	192	2	8500
132	193	6	4995
133	193	3	17995
134	193	4	9495
135	193	4	9495
136	193	6	4995
137	194	6	4995
138	194	3	17995
139	194	4	9495
140	195	2	8500
141	196	6	4995
142	197	3	17995
143	197	4	9495
144	197	2	8500
145	198	4	9495
146	198	4	9495
147	199	4	9495
148	199	3	17995
149	200	3	17995
150	201	4	9495
151	202	5	2995
152	203	3	17995
153	204	6	4995
154	205	4	9495
155	206	1	29995
156	206	4	9495
157	207	3	17995
158	208	4	9495
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.carts ("cartId", "createdAt") FROM stdin;
163	2020-10-01 12:27:55.488176-07
164	2020-10-01 13:53:05.355813-07
165	2020-10-01 13:53:30.863923-07
166	2020-10-01 13:58:16.723549-07
167	2020-10-01 14:00:09.090968-07
168	2020-10-01 14:01:21.987334-07
169	2020-10-01 14:02:12.123002-07
170	2020-10-01 14:02:57.07612-07
171	2020-10-01 14:03:35.528126-07
172	2020-10-01 14:06:05.999612-07
173	2020-10-01 14:09:02.576639-07
174	2020-10-01 14:11:05.295296-07
175	2020-10-01 14:15:12.50568-07
176	2020-10-01 14:15:15.612434-07
177	2020-10-01 14:15:54.709828-07
178	2020-10-01 14:21:08.784607-07
179	2020-10-01 14:21:59.656501-07
180	2020-10-01 18:42:22.810315-07
181	2020-10-01 18:42:52.785438-07
182	2020-10-12 13:36:09.345015-07
183	2020-10-12 20:58:32.475658-07
184	2020-10-12 21:15:15.148495-07
185	2020-10-13 11:31:12.263696-07
186	2020-10-13 13:37:15.522007-07
187	2020-10-13 13:40:03.131413-07
188	2020-10-13 13:41:45.980871-07
189	2020-10-13 13:48:12.104312-07
190	2020-10-13 14:03:44.304471-07
191	2020-10-14 18:14:02.828822-07
192	2020-10-15 10:46:27.005025-07
193	2020-10-15 14:59:03.91372-07
194	2020-10-15 23:47:18.902457-07
195	2020-10-16 11:51:45.973046-07
196	2020-10-16 12:31:28.615121-07
197	2020-10-16 12:44:02.042892-07
198	2020-10-16 12:48:17.950387-07
199	2020-10-16 12:50:04.952171-07
200	2020-10-16 13:33:29.356467-07
201	2020-10-16 13:39:48.884373-07
202	2020-10-16 13:48:46.659453-07
203	2020-10-16 14:08:39.382916-07
204	2020-10-16 14:12:41.504201-07
205	2020-10-16 14:23:20.496155-07
206	2020-10-16 15:09:47.53729-07
207	2020-10-16 15:12:26.32144-07
208	2020-10-16 15:14:09.141457-07
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders ("orderId", "cartId", name, "creditCard", "shippingAddress", "createdAt") FROM stdin;
3	182	Jaime	123456789	1234 street ln	2020-10-12 20:48:38.816189-07
5	184	Logan	12345	1234 Chill ln	2020-10-12 21:16:23.303381-07
6	184	Clark	123456789	1234 Daily Planet ln	2020-10-12 21:20:25.785902-07
7	184	Bruce	123456789	1234 Gotham City ln	2020-10-12 21:27:00.440209-07
8	185	Uzumaki Naruto	123456789	1234 stree ln	2020-10-13 13:33:27.68008-07
9	186	Uzumaki Naruto	123456789	12345 Konoha ln	2020-10-13 13:38:07.947379-07
10	187	Uzumaki Naruto	123456789	1234 street ln	2020-10-13 13:40:31.002762-07
11	188	Uzumaki Naruto	123456788990	12345 street	2020-10-13 13:42:08.642758-07
12	189	Uchiha Sauke	123456788	98765 Konaoha ln	2020-10-13 13:58:53.4065-07
13	191	batman	123456	123456 street ln rd	2020-10-14 22:17:42.264548-07
14	192	jaime sandoval	123456	sleepy ln	2020-10-15 14:15:24.65919-07
15	193	Ichigo Kurosake	74949789058	Bankai rd	2020-10-15 23:39:59.248147-07
16	195	Peter Parker	123456789	1234 Daily Bugle ln	2020-10-16 11:56:22.555313-07
17	196	jaime sandoval	123456788990	12345 tree ln	2020-10-16 12:40:36.71206-07
18	197	jaime sandoval	123456	1234 Hollow ln	2020-10-16 12:44:56.316759-07
19	198	Sasuke Uchiha	123456778	12345 Konoha ln	2020-10-16 12:49:20.753044-07
20	199	test	test	test	2020-10-16 13:30:51.564189-07
21	200	jaime sandoval	12345	12345 street pl	2020-10-16 13:39:28.142948-07
22	201	Minato	456789876	33568 Konoha ln	2020-10-16 13:42:05.568029-07
23	202	test2	test2	12345 test st	2020-10-16 14:08:20.41251-07
24	203	test3	test3	1234 test3 st	2020-10-16 14:10:10.436647-07
25	204	test4	test4	12345 test way	2020-10-16 14:19:36.460198-07
26	205	mvp tes	mvp test	1234 mvp test st	2020-10-16 14:23:46.689439-07
27	206	Test5	Test5	8978 Tester way	2020-10-16 15:10:23.124827-07
28	207	mr james	1234	1234street	2020-10-16 15:13:58.380864-07
29	208	Test 6	123466567	12334 testing ln	2020-10-16 15:15:07.960683-07
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products ("productId", name, price, image, "shortDescription", "longDescription") FROM stdin;
4	Tinyroots 5 Piece Carbon Steel Pruning Kit	9495	/images/5-piece-carbon.png	This 5 Piece Pruning Kit from Tinyroots comes with the three most popular Bonsai tools from a top-quality manufacturer.	Tinyroots 5 Piece Carbon Steel Pruning Kit. This 5 Piece Pruning Kit from Tinyroots comes with the three most popular Bonsai tools from a top-quality manufacturer.Whether you're looking to get into Bonsai and need a great set of tools to get you started, considering upgrading your current set of tools or ready to give a gift that'll thrill any Bonsai enthusiast, then this is the kit for you.
3	Three Amigo's For A Small Balcony	17995	/images/3-amigos.png	This is a One-Of-A-Kind Spruce, San Jose Juniper, and Shimpaku Great little Trio. All of these trees have a great foundation to work with.	Great little Trio. We'll try to create more of these in the future. All of these trees have a great foundation to work with. Although the San Jose (Middle tree) and Shimpaku (Tree on the Right) are in ceramic pots, you should consider all of these trees as pre-bonsai. They're in less than ideal soil and the pot may be to be upsized. All of these trees have a ton of potential. The Spruce is awesome!
1	15+ Year Old Pot Grown San Jose Juniper in Training Pot	29995	/images/san-jose-juniper.png	This juniper is notable for its striking green foliage and beautiful bark. San Jose is a variety that is suitable for upright, cascade, semi-cascade styles.	This is a One-Of-A-Kind San Jose Juniper. This is a pot grown San Jose with a gnarly old trunk. You're not going to find anything like it. Look at the trunk on this tree. This juniper is notable for its striking green foliage and beautiful bark. San Jose is a variety that is suitable for upright, cascade, semi-cascade styles. It's wearing it's winter colors, and it's ready for styling. It's been growing in a pot for more than 15 Yrs. It's going to enjoy full sun. 
5	Tinyroots "Anti-Intimidation" Bonsai Starter Kit is a great way to take your first steps	2995	/images/anti-intimidation.png	Tinyroots "Anti-Intimidation" Bonsai Starter Kit is a great way to take your first steps towards becoming a Bonsai Master.	The Tinyroots Bonsai Starter Kit. If you're a Bonsai beginner, this "Anti-Intimidation" Starter Kit is a great way to take your first steps towards becoming a Bonsai Master. The Tinyroots Bonsai Starter Kit has everything you'll need to raise a happy, healthy Bonsai tree with 6 top-quality items from trusted manufacturers. It's the perfect complement for any Bonsai tree.
6	Tinyroots Shear, Broom & Rake Kit. Perfect Beginner Set or For a Gift.	4995	/images/broom.png	Our Tinyroots brand Shear, Broom and Rake Kit includes everything need to keep your Bonsai tree styled, healthy and happy.	Our Tinyroots brand Shear, Broom and Rake Kit includes everything need to keep your Bonsai tree styled, healthy and happy.Old-world craftsmanship combined with modern technology results in the finest tools available with the aesthetic and feel of fine surgical instruments. Comes complete with a hand made bamboo storage box to provide your tools protection for a lifetime.
2	Pot-Grown Itoigawa Juniper - Ready To Style Pre Bonsai	8500	/images/itoigawa-juniper.png	This is a One Of A Kind Itoigawa Juniper - Pot Grown. They are NOT young cuttings. These Itoigawa Junipers (Juniperus chinensis Itoigawa) have been growing in pots for several years.	"Itoigawa" Juniper Bonsai, is one of the most sought after Juniper in Japan for their unique soft cloud like foliage. The trunks also lend themselves to natural shari. The Itoigawa is native to Japan, the Kurile Islands and the Itoigawa peninsula. Its natural habit is prostrate and it prefers rocky, well-drained soils. In its natural range, it is most often found growing near the sea. The foliage is needle-like on young trees and scale-like on older trees. The fruit is a small, hard, bluish berry.
\.


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."cartItems_cartItemId_seq"', 158, true);


--
-- Name: carts_cartId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."carts_cartId_seq"', 208, true);


--
-- Name: orders_orderId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."orders_orderId_seq"', 29, true);


--
-- Name: products_productId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."products_productId_seq"', 2, true);


--
-- Name: cartItems cartItems_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems"
    ADD CONSTRAINT "cartItems_pkey" PRIMARY KEY ("cartItemId");


--
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY ("cartId");


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY ("orderId");


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY ("productId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

