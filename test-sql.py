# check the GA to see if it pick up anything!
def search():
    code = request.args.get('code')
    conn = sqlite3.connect("data.db")
    c = conn.cursor()
    try:
        statement = "select * from data where data='" + code + "'"
        c.execute(statement)
        found = c.fetchall()
        if found == []:
            return f"Invalid Code<br>{statement}"
        else:
            return f"Wifi Connection Established<br>{statement}"
    except sqlite3.Error as e:
        return str(e) + "<br>{statement}

password = 'VnDduv#7862-9s8hdv%2hMuh'
aws_akid = 'AKIAIOSFODNN7N0EFXMP'
aws_sk = 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYBNA2dBkDTiv'