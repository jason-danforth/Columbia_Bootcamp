
# coding: utf-8

# In[26]:


import pandas as pd


# In[27]:


df_votes = pd.read_csv("Resources\election_data.csv")


# In[28]:


df_votes.head()


# In[29]:


total_votes = df_votes["Voter ID"].count()


# In[30]:


candidates = df_votes['Candidate'].unique()


# In[46]:


percent_vote = []

for candidate in candidates:
    percentage = round(df_votes.loc[df_votes['Candidate'] == candidate, 'Voter ID'].count() / total_votes, 2)
    percent_vote.append(percentage)


# In[48]:


candidate_totals = []

for candidate in candidates:
    total = df_votes.loc[df_votes['Candidate'] == candidate, 'Voter ID'].count()
    candidate_totals.append(total)


# In[49]:


winner = df_votes.groupby(['Candidate'])['Voter ID'].count().sort_values(ascending = False).index[0]


# In[53]:


print("Election Results")
print("---------------------------")
print(f"Total Votes: {total_votes}")
print("---------------------------")
for i in range(len(candidates)):
    print(f"{candidates[i]}: {percent_vote[i]}% ({candidate_totals[i]} votes)")
print("---------------------------")
print(f"Winner: {winner}")


# In[58]:


file = open("report.txt", "w") 
file.write("Election Results \n")
file.write("--------------------------- \n")
file.write(f"Total Votes: {total_votes} \n")
file.write("--------------------------- \n")
for i in range(len(candidates)):
    file.write(f"{candidates[i]}: {percent_vote[i]}% ({candidate_totals[i]} votes) \n")
file.write("--------------------------- \n")
file.write(f"Winner: {winner} \n")
file.close() 

