CREATE TABLE IF NOT EXISTS eintraege (
  id          INTEGER  PRIMARY KEY AUTOINCREMENT,
  kategorie   TEXT     NOT NULL,
  was         TEXT     NOT NULL,
  name        TEXT     NOT NULL,
  menge       TEXT     DEFAULT '',
  kommentar   TEXT     DEFAULT '',
  erstellt_am DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Bestehende Einträge aus Google Sheets übernommen
INSERT INTO eintraege (kategorie, was, name, menge, kommentar) VALUES
  ('Kuchen',               'Thermomix Käsekuchen',         'Torsten',  '16 Stück',          'Bestimmt lecker'),
  ('Kuchen',               'Zitronensandkuchen',            'Tommy V.', '10 Stück',          'Rezept von Opa (Konditormeister!)'),
  ('Getränke alkoholisch', 'Wein, rosé und weiß, trocken', 'Tommy V.', '1 Kasten',          'je nach Konstitution :-)'),
  ('Dessert',              'Tiramisu',                      'Karen',    '20 Portionen',      'Rezept a la Rossella (italienisch)'),
  ('Kuchen',               'Käsekuchen',                    'Karen',    'Blech ca. 30 Stück','Kollegen sagen: sehr lecker');
