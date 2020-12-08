Attribute VB_Name = "Module1"
Sub stock_data_summary()

    Dim sht As Worksheet

    For Each sht In ThisWorkbook.Worksheets
        sht.Activate

        'Write new  column names

        Dim LastColumn As Long
        LastColumn = sht.Cells(1, sht.Columns.Count).End(xlToLeft).Column

        Cells(1, LastColumn + 2).Value = "Ticker"
        Cells(1, LastColumn + 3).Value = "Yearly Change"
        Cells(1, LastColumn + 4).Value = "Percent Change"
        Cells(1, LastColumn + 5).Value = "Total Stock Volume"



        'Loop through rows

        Dim LastRow As Long
        Dim ticker As String
        Dim new_ticker As String
        Dim stock_open As Double
        Dim stock_close As Double
        Dim yearly_change As Double
        Dim percent_change As Double
        Dim big_percent_inc As Double
        Dim big_percent_dec As Double
        Dim stock_volume As Double
        Dim big_stock_volume As Double
        Dim ticker_count As Integer

        LastRow = sht.Cells(Rows.Count, 1).End(xlUp).Row
        ticker = sht.Cells(2, 1).Value
        stock_open = sht.Cells(2, 3).Value
        stock_close = sht.Cells(2, 6).Value
        stock_volume = 0
        ticker_count = 1

        For I = 2 To (LastRow + 1)
            new_ticker = Cells(I, 1).Value
            stock_volume = stock_volume + Cells(I, 7).Value

            If new_ticker <> ticker Then
                stock_close = Cells(I - 1, 6).Value
                yearly_change = stock_close - stock_open
                'Do not calculate % change if stock_open = 0 (it will be infinite)
                If stock_open = 0 Then
                    stock_open = 1
                End If
                percent_change = (yearly_change / stock_open) * 100

                'Print results for given stock

                sht.Cells(ticker_count + 1, LastColumn + 2).Value = ticker

                sht.Cells(ticker_count + 1, LastColumn + 3).Value = yearly_change
                sht.Cells(ticker_count + 1, LastColumn + 4).NumberFormat = "0.00%"
                sht.Cells(ticker_count + 1, LastColumn + 4).Value = percent_change
                sht.Cells(ticker_count + 1, LastColumn + 5).Value = stock_volume

                'Format colors for yearly_change
                If yearly_change > 0 Then
                    sht.Cells(ticker_count + 1, LastColumn + 3).Interior.ColorIndex = 4
                ElseIf yearly_change < 0 Then
                    sht.Cells(ticker_count + 1, LastColumn + 3).Interior.ColorIndex = 3
                End If

                'Update values for new stock
                ticker = new_ticker
                ticker_count = ticker_count + 1
                stock_open = sht.Cells(I, 3).Value
                stock_volume = 0

            End If
        Next I



        'Determine greatest increase, decrease, volume

        Cells(1, LastColumn + 8).Value = "Ticker"
        Cells(1, LastColumn + 9).Value = "Value"
        Cells(2, LastColumn + 7).Value = "Greatest % Increase"
        Cells(3, LastColumn + 7).Value = "Greatest % Decrease"
        Cells(4, LastColumn + 7).Value = "Greatest Total Volume"

        LastRow = sht.Cells(Rows.Count, 9).End(xlUp).Row

        big_percent_inc = Cells(2, LastColumn + 4).Value
        big_percent_dec = Cells(2, LastColumn + 4).Value
        big_stock_volume = Cells(2, LastColumn + 5).Value

        For I = 2 To LastRow
            'Update Greatest % Increase
            If Cells(I, LastColumn + 4).Value > big_percent_inc Then
                'Update Ticker
                Cells(2, LastColumn + 8).Value = Cells(I, LastColumn + 2).Value
                'Update Value
                big_percent_inc = Cells(I, LastColumn + 4).Value
                Cells(2, LastColumn + 9).Value = big_percent_inc
            End If

            'Update Greatest % Decrease
            If Cells(I, LastColumn + 4).Value < big_percent_dec Then
                'Update Ticker
                Cells(3, LastColumn + 8).Value = Cells(I, LastColumn + 2).Value
                'Update Value
                big_percent_dec = Cells(I, LastColumn + 4).Value
                Cells(3, LastColumn + 9).Value = big_percent_dec
            End If

            'Update Greatest Total Volume
            If Cells(I, LastColumn + 5).Value > big_stock_volume Then
                'Update Ticker
                Cells(4, LastColumn + 8).Value = Cells(I, LastColumn + 2).Value
                'Update Value
                big_stock_volume = Cells(I, LastColumn + 5).Value
                Cells(4, LastColumn + 9).Value = big_stock_volume
            End If
        Next I
    Next


End Sub
