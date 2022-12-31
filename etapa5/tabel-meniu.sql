DROP TYPE IF EXISTS tipuri_ingrediente CASCADE;
DROP TYPE IF EXISTS optiuni_meniu CASCADE;
DROP TYPE IF EXISTS produs_congelat CASCADE;
DROP TABLE IF EXISTS meniu CASCADE;

CREATE TYPE tipuri_ingrediente AS ENUM('vegetariene', 'vegane', 'non-vegane/vegetariene');
CREATE TYPE optiuni_meniu AS ENUM('Pizza', 'Paste', 'Burger', 'Grill', 'Garnituri', 'Salate', 'Desert', 'Alcool', 'Racoritoare');
CREATE TYPE produs_congelat AS ENUM('congelat', 'decongelat');

CREATE TABLE IF NOT EXISTS meniu (
   id serial PRIMARY KEY,
   nume VARCHAR(50) UNIQUE NOT NULL,
   descriere TEXT,
   imagine VARCHAR(300),
   tip_produs optiuni_meniu DEFAULT 'Pizza',
   tip_ingredient tipuri_ingrediente DEFAULT 'non-vegane/vegetariene',
   pret NUMERIC(8,2) NOT NULL,
   calorii INT CHECK (calorii>=0),
   data_adaugare TIMESTAMP DEFAULT current_timestamp,
   congelat produs_congelat DEFAULT 'decongelat',
   ingrediente VARCHAR[],
   primeste_tacamuri BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT into meniu (nume,descriere,imagine,tip_produs,tip_ingredient,pret,calorii,data_adaugare,congelat,ingrediente,primeste_tacamuri) VALUES 
('Margherita', 'Pizza margherita 30cm', 'margherita.png', 'Pizza', 'vegetariene', 30, 275, '2016-06-22', 'decongelat', '{"blat pizza", " sos rosii", " topping mozzarella", " oregano", " busuioc"}', False),
('Quattro formaggi', 'Pizza quattro-formaggi 30cm', 'pizza-quattro-formaggi.png', 'Pizza', 'vegetariene', 41, 300, '2022-07-21', 'decongelat', '{"blat pizza", " sos rosii", " topping mozzarella", " topping gorgonzola", " topping parmezan", " topping cheddar"}', False),
('Pepperoni', 'Pizza pepperoni 30cm', 'pepperoni.png', 'Pizza', 'non-vegane/vegetariene', 41, 350, '2022-12-28', 'decongelat', '{"blat pizza", " sos rosii", " pepperoni"}', False),
('Quattro stagioni', 'Pizza quattro-stagioni 30cm', 'quattro-stagioni.png', 'Pizza', 'non-vegane/vegetariene', 41, 285, current_timestamp, 'decongelat', '{"blat pizza", " sos rosii", " topping mozzarella", " bacon", " ardei gras", " ciuperci"}', False),
('Pizza point', 'Pizza reteta proprie 30cm', 'pizza-point.png', 'Pizza', 'non-vegane/vegetariene', 41, 300, current_timestamp, 'decongelat', '{"blat pizza", " sos rosii", " topping mozzarella", " bacon", " ciuperci", " busuioc"}', False),
('Paste milanese', 'Paste milanese 500g', 'pasta-milanese.png', 'Paste', 'non-vegane/vegetariene', 31, 240, current_timestamp, 'decongelat', '{"paste din grau dur", " sunca", " sos rosii", " ciuperci"}', True),
('Paste quattro formaggi', 'Paste quattro formaggi 500g', 'pasta-quattro-formaggi.png', 'Paste', 'vegetariene', 35, 300, current_timestamp, 'decongelat', '{"paste din grau dur", " mozzarella", " gorgonzola", " parmezan", " cheddar", " sos gran cucina"}', True),
('Paste carbonara', 'Paste carbonara 500g', 'carbonara.png', 'Paste', 'non-vegane/vegetariene', 34, 270, current_timestamp, 'decongelat', '{"paste din grau dur", " sos gran cucina", " bacon", " parmezan"}', True),
('Paste aglio e olio', 'Paste aglio e olio 300g', 'aglio-e-olio.png', 'Paste', 'vegane', 43, 220, current_timestamp, 'decongelat', '{"paste din grau dur", " ulei de masline", " usturoi"}', True),
('Cheeseburger', 'Cheeseburger 150g', 'cheeseburger.png', 'Burger', 'non-vegane/vegetariene', 19, 300, current_timestamp, 'decongelat', '{"chifla carne vita", " castraveti murati", " ketchup", " rosii", " ceapa caramelizata", " bacon", " 2x chifla paine alba", " cheddar"}', False),
('Dublu cheeseburger', 'Dublu cheeseburger 160g', 'double-cheeseburger.png', 'Burger', 'non-vegane/vegetariene', 21, 350, current_timestamp, 'decongelat', '{"2x chifla carne vita", " castraveti murati", " ketchup", " rosii", " ceapa caramelizata", " bacon", " 2x chifla paine alba", " cheddar"}', False),
('Hamburger', 'Hamburger 150g', 'hamburger.png', 'Burger', 'non-vegane/vegetariene', 20, 290, current_timestamp, 'decongelat', '{"chifla carne vita", " castraveti murati", " ketchup", " rosii", " ceapa caramelizata", " bacon", " 2x chifla paine alba"}', False),
('Ceafa de porc', 'Ceafa de porc 150g', 'pork.png', 'Grill', 'non-vegane/vegetariene', 30, 230, current_timestamp, 'decongelat', '{"cefa porc", " condimente"}', True),
('File de somon', 'File de somon 150g', 'salmon.png', 'Grill', 'non-vegane/vegetariene', 41, 120, current_timestamp, 'decongelat', '{"file somon", " condimente"}', True),
('Snitel de pui', 'Snitel de pui 150g', 'schnitzel.png', 'Grill', 'non-vegane/vegetariene', 27, 230, current_timestamp, 'decongelat', '{"piept de pui", " pesmet", " faina"}', True),
('Piure de cartofi', 'Piure de cartofi 300g', 'mashed-potatoes.png', 'Garnituri', 'vegetariene', 14, 80, current_timestamp, 'decongelat', '{"cartofi", " unt", " lapte"}', True),
('Cartofi prajiti', 'Cartofi prajiti 200g', 'french-fries.png', 'Garnituri', 'vegane', 10, 310, current_timestamp, 'decongelat', '{"cartofi", " ulei"}', True),
('Orez cu legume', 'Orez cu legume 300g', 'rice.png', 'Garnituri', 'vegane', 15, 100, current_timestamp, 'decongelat', '{"orez", " mix legume mexicane"}', True),
('Inele de ceapa', 'Inele de ceapa 100g', 'onion-rings.png', 'Garnituri', 'vegane', 16, 410, current_timestamp, 'decongelat', '{"ceapa", " pesmet", " faina"}', True),
('Salata caesar', 'Salata caesar 300g', 'caesar-salad.png', 'Salate', 'non-vegane/vegetariene', 30, 50, current_timestamp, 'decongelat', '{"piept de pui", " parmezan", " salata iceberg", " sos italian", " rosii"}', True),
('Salata greceasca', 'Salata greceasca 380g', 'greek-salad.png', 'Salate', 'vegetariene', 28, 45, current_timestamp, 'decongelat', '{"telemea de vaca", " salata iceberg", " ceapa", " rosii"}', True),
('Salata cu ton', 'Salata cu ton 500g', 'tuna-salad.png', 'Salate', 'non-vegane/vegetariene', 32, 60, current_timestamp, 'decongelat', '{"ton", " salata iceberg", " porumb", " rosii"}', True),
('Cheesecake', 'Cheesecake 200g', 'cheesecake.png', 'Desert', 'vegetariene', 20, 320, current_timestamp, 'decongelat', '{"biscuiti digestivi", " fructe de padure", " crema de branza", " unt", " oua", " smantana lichida", " zahar", " faina"}', True),
('Tiramisu', 'Tiramisu 220g', 'tiramisu.png', 'Desert', 'vegetariene', 21, 300, current_timestamp, 'decongelat', '{"piscoturi", " cafea", " mascarpone", " zahar", " oua", " cacao"}', True),
('Inghetata de vanilie', 'Inghetata de vanilie 120g', 'ice-cream.png', 'Desert', 'vegetariene', 14, 200, current_timestamp, 'congelat', '{""}', True),
('Bere blonda', 'Bere blonda 0.33L', 'beer.png', 'Alcool', 'vegane', 7, 40, current_timestamp, 'decongelat', '{""}', False),
('Whiskey', 'Whiskey 0.7L', 'whiskey.png', 'Alcool', 'vegane', 119, 250, current_timestamp, 'decongelat', '{""}', False),
('Vin rosu', 'Vin rosu 0.75L', 'wine.png', 'Alcool', 'vegane', 51, 80, current_timestamp, 'decongelat', '{""}', False),
('Apa', 'Apa 0.5L', 'water.png', 'Racoritoare', 'vegane', 6, 0, current_timestamp, 'decongelat', '{""}', False),
('Coca-cola', 'Coca-cola 0.33L', 'coca-cola.png', 'Racoritoare', 'vegane', 7, 40, current_timestamp, 'decongelat', '{""}', False)