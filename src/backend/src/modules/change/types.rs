pub type Id = u64;
pub type TableName = String;
pub type Operation = String;
pub type RowId = u64;
pub type NewValues = String;

pub type Change = (Id, TableName, Operation, RowId, NewValues);
