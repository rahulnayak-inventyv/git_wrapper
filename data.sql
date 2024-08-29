-- Show DB 

-- Insert Query:
    -- INSERT INTO vms_AttributeMaster(Name,Description,Control,AttributeValue,CreatedDate)VALUES("Englist Text", "English Text", "TextArea", "EnglishText", CURDATE()),("German Text" , "German Text", "TextArea", "GermanText", CURDATE()),("Element Id", "process step Element Id ", "AutoFill", "ElementId", CURDATE() ),("Mandatory", "Mandatory", "Dropdown", "Mandatory", CURDATE()),("Validation", "Validation", "TextArea", "Validation", CURDATE() ),("Display Condition", "Display Condition", "TextArea", "DisplayCondition", CURDATE()),("Info Text", "Info Text", "TextArea", "Info Text", CURDATE()),("Video Link", "Video Link", "TextArea", "VideoLink", CURDATE()),("Lookup Id", "Lookup Id", "AutoFill", "LookupId", CURDATE());

-- Show table columns
    --  describe vms_AttributeMaster

-- modify Query
    -- ALTER TABLE vms_AttributeMaster MODIFY UpdatedDate DATETIME DEFAULT NULL;