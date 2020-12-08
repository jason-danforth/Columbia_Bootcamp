
# coding: utf-8

# In[71]:


import pandas as pd


# In[72]:


df_budget = pd.read_csv("Resources/budget_data.csv")


# In[73]:


df_budget.head()


# In[74]:


months = df_budget["Date"].count()


# In[75]:


net_total = "$" + str(df_budget['Profit/Losses'].sum())


# In[76]:


average = "$" + str(int(df_budget['Profit/Losses'].mean()))


# In[77]:


max_increase = df_budget["Profit/Losses"].max()
max_date = df_budget.loc[df_budget["Profit/Losses"] == max_increase, "Date"].values[0]


# In[78]:


max_decrease = df_budget["Profit/Losses"].min()
min_date = df_budget.loc[df_budget["Profit/Losses"] == max_decrease, "Date"].values[0]


# In[79]:


max_decrease


# In[82]:


print("Financial Analysis")
print("-------------------------------------")
print(f"Total Months: {months}")
print(f"Total: {net_total}")
print(f"Average Change: {average}")
print(f"Greatest increase in profits: ${max_increase} on {max_date}")
print(f"Greatest loss in profits: ${max_decrease} on {min_date}")


# In[83]:


file = open("report.txt", "w") 
file.write("Financial Analysis \n")
file.write("------------------------------------- \n")
file.write(f"Total Months: {months} \n")
file.write(f"Total: {net_total} \n")
file.write(f"Average Change: {average} \n")
file.write(f"Greatest increase in profits: ${max_increase} on {max_date} \n")
file.write(f"Greatest loss in profits: ${max_decrease} on {min_date} \n") 
file.close() 

